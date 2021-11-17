import styled, { css } from 'styled-components/native';
import { Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';
import {
  BorderlessButton,
  BorderlessButtonProps,
} from 'react-native-gesture-handler';

export const Container = styled.KeyboardAvoidingView.attrs({
  keyboardVerticalOffset: -16, // iOS
})`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.View`
  flex: 1;

  ${Platform.OS === 'ios'
    ? css`
      padding: ${getStatusBarHeight() + 24}px 24px ${getBottomSpace()}px;
    `
    : css`
      padding: 24px;
    `};
`;

export const LogoWrapper = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  showsVerticalScrollIndicator: false,
})``;

export const InputWrapper = styled.View`
  margin-bottom: 16px;
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.purple};
  margin-left: 16px;
`;

export const ButtonWrapper = styled.View`
  margin-top: 8px;
`;

export const ForgotPasswordButton = styled(BorderlessButton)
  .attrs<BorderlessButtonProps>(({ theme }) => ({
    activeOpacity: 0.5, // iOS
    borderless: false, // Android
    rippleColor: theme.colors.placeholder,
  }))`
    margin: 16px auto;
  `;

export const ForgotPasswordButtonText = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.white};
`;

export const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
`;

export const FooterText = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.white};
  margin-right: 8px;
`;

export const SignUpButton = styled(BorderlessButton)
  .attrs<BorderlessButtonProps>(({ theme }) => ({
    activeOpacity: 0.5, // iOS
    borderless: false, // Android
    rippleColor: theme.colors.purple,
  }))``;

export const SignUpButtonText = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.purple};
`;
