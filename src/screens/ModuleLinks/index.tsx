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
import theme from '../../styles/theme';
import { RFValue } from 'react-native-responsive-fontsize';

import { MainStackParamList } from '../../routes/main.routes';
import { DrawerParamList } from '../../routes/drawer.routes';
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

type ModuleLinksScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<MainStackParamList, 'ModuleLinks'>,
  DrawerNavigationProp<DrawerParamList>
>;

type ModuleLinksScreenRouteProp = RouteProp<MainStackParamList, 'ModuleLinks'>;

export function ModuleLinks() {
  const theme = useTheme();
  const navigation = useNavigation<ModuleLinksScreenNavigationProp>();
  const { params: { module } } = useRoute<ModuleLinksScreenRouteProp>();

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

        <Title>Links</Title>
      </TitleContainer>

      <Content>
        <Scroll>
          <Markdown style={styles} onLinkPress={onLinkPress}>{module.links}</Markdown>
        </Scroll>

        <ButtonWrapper>
          <Button title="Quiz" onPress={handleModuleQuizz} />
        </ButtonWrapper>
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
  link: {
    color: theme.colors.orange,
    fontFamily: theme.fonts.medium,
  },
});
