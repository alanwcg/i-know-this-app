import React from 'react';
import { StatusBar } from 'react-native';
import { shade } from 'polished';
import { useTheme } from 'styled-components';

import {
  Container,
  Content,
  CloseButton,
  CloseIcon,
  Text,
  ButtonContainer,
  Button,
  ButtonText,
} from './styles';

type ContentOrQuizzModalProps = {
  moduleName: string;
  closeModal: () => void;
  handleChoice: (filter: string) => void;
}

export function ContentOrQuizzModal({
  moduleName,
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

        <Text>{moduleName}</Text>

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
