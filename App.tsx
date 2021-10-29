import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';
import {
  useFonts,
  FiraCode_400Regular,
  FiraCode_500Medium,
  FiraCode_700Bold,
} from '@expo-google-fonts/fira-code';

import theme from './src/styles/theme';

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
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
