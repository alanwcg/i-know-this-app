import React, { useState, useCallback, useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  useNavigation,
  useRoute,
  RouteProp,
  CompositeNavigationProp,
} from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import theme from '../../styles/theme';
import { RFValue } from 'react-native-responsive-fontsize';
import axios from 'axios';

import { Option, Question as QuestionType } from '../../types/Question';
import { MainStackParamList } from '../../routes/main.routes';
import { DrawerParamList } from '../../routes/drawer.routes';
import { api } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import { useModal } from '../../hooks/useModal';
import { Header } from '../../components/Header';
import { BackButton } from '../../components/BackButton';
import { Spinner } from '../../components/Spinner';
import { Button } from '../../components/Form/Button';
import { RadioButton } from '../../components/Form/RadioButton';

import {
  Container,
  TitleContainer,
  Title,
  Content,
  SpinnerContainer,
  Scroll,
  Question,
  ButtonContainer,
  ButtonWrapper,
} from './styles';

type ModuleQuizzScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<MainStackParamList, 'ModuleQuizz'>,
  DrawerNavigationProp<DrawerParamList>
>;

type ModuleQuizzScreenRouteProp = RouteProp<MainStackParamList, 'ModuleQuizz'>;

export function ModuleQuizz() {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState({} as Option);
  const [chosenOptions, setChosenOptions] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const theme = useTheme();
  const navigation = useNavigation<ModuleQuizzScreenNavigationProp>();
  const { params: { module } } = useRoute<ModuleQuizzScreenRouteProp>();
  const { user } = useAuth();
  const { openModal } = useModal();

  const openDrawer = useCallback(() => {
    navigation.openDrawer();
  }, []);

  function handlePreviousQuestion() {
    setChosenOptions(oldState => {
      const updatedChosenOption = oldState;
      updatedChosenOption[currentQuestion] = selectedOption;
      return updatedChosenOption;
    });

    setSelectedOption(chosenOptions[currentQuestion - 1]);

    if (currentQuestion > 0) {
      setCurrentQuestion(oldState => oldState - 1);
    }
  }

  function handleNextQuestion() {
    const updatedChosenOptions = chosenOptions.map((option, index) => {
      if (currentQuestion === index) {
        return selectedOption
      }

      return option;
    });
    setChosenOptions(updatedChosenOptions);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(oldState => oldState + 1);
      setSelectedOption(chosenOptions[currentQuestion + 1]);
    }
  }

  async function handleFinishQuizz() {
    const updatedChosenOption = chosenOptions;
    updatedChosenOption[currentQuestion] = selectedOption;

    const quizzScore = updatedChosenOption.reduce((acc, option) => {
      if (option.correct_answer) {
        return acc + 1;
      }

      return acc;
    }, 0);

    setChosenOptions(updatedChosenOption);

    try {
      setIsSubmitting(true);

      console.log({
        user_id: user?.id,
        level_id: module.level_id,
        technology_id: module.technology_id,
        progression: quizzScore,
      });

      const response = await api.post('/users-modules', {
        user_id: user?.id,
        level_id: module.level_id,
        module_id: module.id,
        progression: quizzScore,
      });

      setQuestions(response.data);
      setChosenOptions(Array(response.data.length).fill({} as Option));
      setIsSubmitting(false);

      openModal({
        message: `Quiz respondido com sucesso! Quantidade de acertos: ${quizzScore} de ${questions.length}`,
        type: 'success',
      });

      navigation.push('Home');
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        openModal({
          message: error.response?.data.message,
          type: 'error',
        });
      }
      setIsSubmitting(false);
    }
  }

  async function fetchQuestions() {
    try {
      setIsLoading(true);

      const response = await api.get('/questions', {
        params: {
          module_id: module.id,
        }
      });

      setQuestions(response.data);
      setChosenOptions(Array(response.data.length).fill({} as Option));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        openModal({
          message: error.response?.data.message,
          type: 'error',
        });
      }
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.background}
      />

      <Header openDrawer={openDrawer} />

      <TitleContainer>
        <BackButton onPress={() => navigation.goBack()} />

        <Title>Quiz</Title>
      </TitleContainer>

      <Content>
        {isLoading ? (
          <SpinnerContainer>
            <Spinner />
          </SpinnerContainer>
        ) : (
          <Scroll>
            {questions.length > 0 && (
              <>
                <Question>{questions[currentQuestion].text}</Question>

                <RadioButton
                  items={questions[currentQuestion].options}
                  selected={selectedOption}
                  setSelected={setSelectedOption}
                />
              </>
            )}
          </Scroll>
        )}

        <ButtonContainer>
          <ButtonWrapper>
            <Button
              title="Voltar"
              enabled={currentQuestion > 0 && !isSubmitting}
              onPress={handlePreviousQuestion}
            />
          </ButtonWrapper>

          <ButtonWrapper>
            {currentQuestion === questions.length - 1 ? (
              <Button
                title="Finalizar"
                enabled={!!selectedOption.id && !isSubmitting}
                loading={isSubmitting}
                onPress={handleFinishQuizz}
              />
            ) : (
              <Button
                title="Próxima"
                enabled={currentQuestion < questions.length - 1 && !!selectedOption.id}
                onPress={handleNextQuestion}
              />
            )}
          </ButtonWrapper>
        </ButtonContainer>

      </Content>
    </Container>
  );
}

//TODO: Estilizar o text em markdown que vem dentro de module.content
const styles = StyleSheet.create({
  body: {
    color: theme.colors.white,
    fontSize: RFValue(16),
  },
  heading1: {
    color: theme.colors.white,
  }
});
