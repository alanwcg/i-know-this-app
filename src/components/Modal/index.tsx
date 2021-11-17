import React from 'react';
import { StatusBar, Modal as RNModal } from 'react-native';
import { shade } from 'polished';
import { useTheme } from 'styled-components';
import { useModal } from '../../hooks/useModal';

import {
  Container,
  Content,
  Message,
  Icon,
  Text,
  ButtonWrapper,
  Button,
  ButtonText,
} from './styles';

export function Modal() {
  const theme = useTheme();
  const { modalData: { isOpen, message, type }, closeModal } = useModal();

  function getIconName() {
    switch (type) {
      case 'success':
        return 'check-circle'
      case 'error':
        return 'close-circle'
      default:
        return 'information';
    }
  }

  return (
    <RNModal
      visible={isOpen}
      transparent
      animationType="fade"
    >
      <Container onPress={closeModal}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="rgba(0, 0, 0, 0.95)"
        />

        <Content>
          <Message>
            <Icon name={getIconName()} type={type} />
            <Text type={type}>{message}</Text>
          </Message>


          <ButtonWrapper>
            <Button
              style={({ pressed }) => ({
                backgroundColor: pressed
                  ? shade(0.2, theme.colors.purple)
                  : theme.colors.purple,
              })}
              onPress={closeModal}
            >
              <ButtonText>OK</ButtonText>
            </Button>
          </ButtonWrapper>
        </Content>
      </Container>
    </RNModal>
  );
}
