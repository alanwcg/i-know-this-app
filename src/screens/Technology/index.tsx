import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';

import { useAuth } from '../../hooks/useAuth';
import { Header } from '../../components/Header';

import {
  Container,
} from './styles';

export function Technology() {
  const theme = useTheme();
  const { user } = useAuth();

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.background}
      />

      <Header user={user} />

    </Container>
  );
}
