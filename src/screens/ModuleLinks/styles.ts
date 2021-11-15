import styled, { css } from 'styled-components/native';
import { Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';
import {
  RectButton,
  RectButtonProps,
} from 'react-native-gesture-handler';

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

export const Title = styled.Text`
  font-size: ${RFValue(24)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.purple};
`;

export const Content = styled.View`
  flex: 1;
`;

export const Scroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  showsVerticalScrollIndicator: false,
})``;

export const ButtonWrapper = styled.View`
  margin-top: 16px;
`;
