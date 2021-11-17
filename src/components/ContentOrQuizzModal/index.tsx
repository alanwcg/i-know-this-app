import React from 'react';
import { StatusBar } from 'react-native';
import { shade } from 'polished';
import { useTheme } from 'styled-components';

import { Module } from '../../types/Module';

import {
  Container,
  Content,
  CloseButton,
  CloseIcon,
  Text,
  ProgressionBar,
  UserProgressionBar,
  Progression,
  ButtonContainer,
  Button,
  ButtonText,
} from './styles';

type ContentOrQuizzModalProps = {
  module: Module;
  closeModal: () => void;
  handleChoice: (filter: string) => void;
}

export function ContentOrQuizzModal({
  module,
  closeModal,
  handleChoice,
}: ContentOrQuizzModalProps) {
  const theme = useTheme();

  return (
    <Container onPress={closeModal}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="rgba(0, 0, 0, 0.95)"
      />

      <Content>
        <CloseButton
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
          })}
          onPress={closeModal}
        >
          <CloseIcon name="close" />
        </CloseButton>

        <Text>{module.name}</Text>

        {module.userModules[0] ? (
          <ProgressionBar>
            <UserProgressionBar width={module.userModules[0].progression * 20} />

            <Progression>{`${module.userModules[0].progression * 20}%`}</Progression>

          </ProgressionBar>
        ) : (
          <ProgressionBar>
            <UserProgressionBar width={0} />

            <Progression>0%</Progression>

          </ProgressionBar>
        )}


        <ButtonContainer>
          <Button
            style={({ pressed }) => ({
              backgroundColor: pressed
                ? shade(0.2, theme.colors.purple)
                : theme.colors.purple,
            })}
            onPress={() => handleChoice('content')}
          >
            <ButtonText>Conteúdo</ButtonText>
          </Button>

          <Button
            style={({ pressed }) => ({
              backgroundColor: pressed
                ? shade(0.2, theme.colors.purple)
                : theme.colors.purple,
            })}
            onPress={() => handleChoice('quizz')}
          >
            <ButtonText>Quizz</ButtonText>
          </Button>
        </ButtonContainer>
      </Content>
    </Container>
  );
}
