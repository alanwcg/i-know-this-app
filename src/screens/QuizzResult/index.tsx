import React, { useCallback } from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import {
  useNavigation,
  useRoute,
  RouteProp,
  CompositeNavigationProp,
} from '@react-navigation/native';

import { MainStackParamList } from '../../routes/main.routes';
import { DrawerParamList } from '../../routes/drawer.routes';
import { Header } from '../../components/Header';
import { Button } from '../../components/Form/Button';
import { RadioButton } from '../../components/Form/RadioButton';

import {
  Container,
  TitleContainer,
  Title,
  Result,
  Content,
  Scroll,
  QuestionContainer,
  Question,
  ButtonWrapper,
} from './styles';

type QuizzResultScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<MainStackParamList, 'QuizzResult'>,
  DrawerNavigationProp<DrawerParamList>
>;

type QuizzResultScreenRouteProp = RouteProp<MainStackParamList, 'QuizzResult'>;

export function QuizzResult() {
  const theme = useTheme();
  const navigation = useNavigation<QuizzResultScreenNavigationProp>();
  const { params: {
    questions,
    chosenOptions,
    quizzScore,
  }} = useRoute<QuizzResultScreenRouteProp>();

  const openDrawer = useCallback(() => {
    navigation.openDrawer();
  }, []);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.background}
      />

      <Header openDrawer={openDrawer} />

      <TitleContainer>
        <Title>Resultado</Title>

        <Result>{`Acertos: ${quizzScore} / ${questions.length}`}</Result>
      </TitleContainer>

      <Content>
        <Scroll>
          {questions.map((question, index) => (
            <QuestionContainer key={question.id}>
              <Question>{question.text}</Question>

              <RadioButton
                items={question.options}
                selected={chosenOptions[index]}
                showResult
              />
            </QuestionContainer>
          ))}
        </Scroll>

        <ButtonWrapper>
          <Button
            title="Finalizar"
            onPress={() => navigation.push('Home')}
          />
        </ButtonWrapper>
      </Content>
    </Container>
  );
}
