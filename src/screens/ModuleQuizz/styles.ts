import styled, { css } from 'styled-components/native';
import { Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';

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

export const SpinnerContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Scroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  showsVerticalScrollIndicator: false,
})``;

export const Question = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.white};
  text-align: justify;
  margin-bottom: 24px;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
`;

export const ButtonWrapper = styled.View`
  width: 47%;
`;
