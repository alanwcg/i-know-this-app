import React from 'react';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';
import {
  useFonts,
  FiraCode_400Regular,
  FiraCode_500Medium,
  FiraCode_700Bold,
} from '@expo-google-fonts/fira-code';

import theme from './src/styles/theme';
import { Routes } from './src/routes';
import { AuthProvider } from './src/hooks/useAuth';
import { ModalProvider } from './src/hooks/useModal';
import { Modal } from './src/components/Modal';

export default function App() {
  const [fontsLoaded] = useFonts({
    FiraCode_400Regular,
    FiraCode_500Medium,
    FiraCode_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <ModalProvider>
        <AuthProvider>
          <Routes />

          <Modal />
        </AuthProvider>
      </ModalProvider>
    </ThemeProvider>
  );
}
