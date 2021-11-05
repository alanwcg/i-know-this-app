import styled, { css } from 'styled-components/native';
import { Platform, FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Feather, Ionicons } from '@expo/vector-icons';
import {
  BorderlessButton,
  BorderlessButtonProps,
  RectButton,
  RectButtonProps,
} from 'react-native-gesture-handler';

import { Technology } from '../../types/Technology';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};

  ${Platform.OS === 'ios'
    ? css`
      padding: ${getStatusBarHeight() + 24}px 24px ${getBottomSpace()}px;
    `
    : css`
      padding: 24px;
    `};
`;

export const Content = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: ${RFValue(24)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.purple};
  text-align: center;
  margin-bottom: 24px;
`;

export const SpinnerContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const TechnologiesList = styled(FlatList as new () => FlatList<Technology>)
  .attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
      flexGrow: 1,
    },
  })``;

export const TechButton = styled(RectButton).attrs<RectButtonProps>({
  activeOpacity: 0.2, // iOS Only
})`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray};

  padding: 24px;
  border-radius: 16px;
  flex-direction: row;
  align-items: center;
`;

export const TechIcon = styled(Ionicons)`
  font-size: ${RFValue(64)}px;
  color: ${({ theme }) => theme.colors.cyan};
`;

export const TechName = styled.Text`
  font-size: ${RFValue(24)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.white};
  margin-left: 24px;
`;
