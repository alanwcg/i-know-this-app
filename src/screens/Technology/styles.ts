import styled, { css } from 'styled-components/native';
import { Platform, FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';
import {
  BorderlessButton,
  BorderlessButtonProps,
  RectButton,
  RectButtonProps,
} from 'react-native-gesture-handler';

import { Level } from '../../types/Level';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};

  flex: 1;

  ${Platform.OS === 'ios'
    ? css`
      padding: ${getStatusBarHeight() + 24}px 24px ${getBottomSpace()}px;
    `
    : css`
      padding: 24px;
    `};
`;

export const TitleContainer = styled.View`
  width: 100%;
  padding: 0 24px;
  align-items: center;
  margin-bottom: 24px;
`;

export const BackButton = styled(BorderlessButton)
  .attrs<BorderlessButtonProps>(({ theme }) => ({
    activeOpacity: 0.5, // iOS
    rippleColor: theme.colors.purple, // Android
  }))`
    position: absolute;
    top: 0;
    left: 0;
  `;

export const ArrowLeft = styled(Feather)`
  font-size: ${RFValue(36)}px;
  color: ${({ theme }) => theme.colors.purple};
`;

export const Title = styled.Text`
  font-size: ${RFValue(24)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.purple};
`;

export const SpinnerContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Content = styled(FlatList as new () => FlatList<Level>)
  .attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
      flexGrow: 1,
    },
  })``;

type LevelContainerProps = {
  index: number;
}

export const LevelContainer = styled.View<LevelContainerProps>`
  ${({ index }) => index > 0 &&
    css`
      margin-top: 16px;
    `};
`;

export const LevelButton = styled(RectButton).attrs<RectButtonProps>({
  activeOpacity: 0.2, // iOS Only
})`
  position: relative;
  z-index: 1;
  width: 100%;
  height: ${RFValue(70)}px;
  background-color: ${({ theme }) => theme.colors.gray};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border-radius: 16px;
`;

export const LevelName = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.white};
  text-transform: uppercase;
`;

export const Icon = styled(Feather)`
  position: absolute;
  right: 24px;
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.white};
`;

export const ModulesContainer = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray};
  padding: 16px 16px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
`;

export const ModuleButton = styled(RectButton).attrs<RectButtonProps>({
  activeOpacity: 0.2, // iOS Only
})`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.purple};
  align-items: center;
  justify-content: center;
  padding: 16px;
  border-radius: 16px;
  margin-top: 8px;
`;

export const ModuleName = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.white};
`;
