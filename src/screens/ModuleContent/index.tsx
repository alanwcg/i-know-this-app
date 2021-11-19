import React, { useCallback } from 'react';
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
import Markdown from 'react-native-markdown-display';
import { RFValue } from 'react-native-responsive-fontsize';

import theme from '../../styles/theme';
import { MainStackParamList } from '../../routes/main.routes';
import { DrawerParamList } from '../../routes/drawer.routes';
import { Header } from '../../components/Header';
import { BackButton } from '../../components/BackButton';

import {
  Container,
  TitleContainer,
  Title,
  Content,
  Scroll,
  ButtonContainer,
  Button,
  ButtonText,
} from './styles';

type ModuleContentScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<MainStackParamList, 'ModuleContent'>,
  DrawerNavigationProp<DrawerParamList>
>;

type ModuleContentScreenRouteProp = RouteProp<MainStackParamList, 'ModuleContent'>;

export function ModuleContent() {
  const navigation = useNavigation<ModuleContentScreenNavigationProp>();
  const { params: { module } } = useRoute<ModuleContentScreenRouteProp>();
  const theme = useTheme();

  const openDrawer = useCallback(() => {
    navigation.openDrawer();
  }, []);

  function onLinkPress(url: string) {
    // if (url) {
    //   Linking.openURL(url);
    //   return false;
    // }
    
    // return true to open with `Linking.openURL
    // return false to handle it yourself
    return true;
  }

  function handleModuleLinks() {
    navigation.push('ModuleLinks', {
      module,
    });
  }

  function handleModuleQuizz() {
    navigation.push('ModuleQuizz', {
      module,
    });
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.background}
      />

      <Header openDrawer={openDrawer} />

      <TitleContainer>
        <BackButton onPress={() => navigation.goBack()} />

        <Title>{module.name}</Title>
      </TitleContainer>

      <Content>
        <Scroll>
          <Markdown style={styles} onLinkPress={onLinkPress}>{module.content}</Markdown>
        </Scroll>

        <ButtonContainer>
          <Button onPress={handleModuleLinks}>
            <ButtonText>Links</ButtonText>
          </Button>

          <Button onPress={handleModuleQuizz}>
            <ButtonText>Quiz</ButtonText>
          </Button>
        </ButtonContainer>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  body: {
    color: theme.colors.white,
    fontFamily: theme.fonts.medium,
    fontSize: RFValue(16),
  },
  heading1: {
    color: theme.colors.white,
    fontFamily: theme.fonts.bold,
  },
  fence: {
    backgroundColor: theme.colors.background,
    color: theme.colors.orange,
    fontFamily: theme.fonts.medium,
    borderColor: theme.colors.orange,
  },
  code_inline: {
    backgroundColor: theme.colors.background,
    color: theme.colors.orange,
    fontFamily: theme.fonts.medium,
  }
});
