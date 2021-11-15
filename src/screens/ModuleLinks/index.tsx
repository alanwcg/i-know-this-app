import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Markdown from 'react-native-markdown-display';
import theme from '../../styles/theme';

import { MainStackParamList } from '../../routes/main.routes';
import { useAuth } from '../../hooks/useAuth';
import { Header } from '../../components/Header';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Form/Button';

import {
  Container,
  TitleContainer,
  Title,
  Content,
  Scroll,
  ButtonWrapper,
} from './styles';

type ModuleLinksScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'ModuleContent'
>;

type ModuleLinksScreenRouteProp = RouteProp<MainStackParamList, 'ModuleLinks'>;

const copy = `[This is a link!](https://github.com/iamacup/react-native-markdown-display/)
[Youtube](https://www.youtube.com/watch?v=NgrGzVGjq0U)`;

export function ModuleLinks() {
  const theme = useTheme();
  const navigation = useNavigation<ModuleLinksScreenNavigationProp>();
  const { params: { module } } = useRoute<ModuleLinksScreenRouteProp>();
  const { user } = useAuth();

  function onLinkPress(url: string) {
    // if (url) {
    //   Linking.openURL(url);
    //   return false;
    // }
    
    // return true to open with `Linking.openURL
    // return false to handle it yourself
    return true;
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.background}
      />

      <Header user={user} />

      <TitleContainer>
        <BackButton onPress={() => navigation.goBack()} />

        <Title>Links</Title>
      </TitleContainer>

      <Content>
        <Scroll>
          <Markdown style={styles} onLinkPress={onLinkPress}>{copy}</Markdown>
        </Scroll>

        <ButtonWrapper>
          <Button title="Quizz" onPress={() => console.log('TODO')} />
        </ButtonWrapper>
      </Content>
    </Container>
  );
}

//TODO: Estilizar o text em markdown que vem dentro de module.content
const styles = StyleSheet.create({
  heading1: {
    color: theme.colors.white,
  }
});