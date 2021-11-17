import styled, { css } from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { PressableProps } from 'react-native';

export const Container = styled.Pressable`
  flex: 1;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0 24px;
  background-color: rgba(0, 0, 0, 0.7);
`;

export const Content = styled.Pressable`
  width: 100%;
  justify-content: space-around;
  padding: 16px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.gray};
`;

export const Message = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

type IconProps = {
  type: 'info' | 'success' | 'error';
}

export const Icon = styled(MaterialCommunityIcons) <IconProps>`
font-size: ${RFValue(36)}px;

${({ type, theme }) => type === 'info' &&
  css`
    color: ${theme.colors.cyan};
  `};

${({ type, theme }) => type === 'success' &&
  css`
    color: ${theme.colors.green};
  `};

${({ type, theme }) => type === 'error' &&
  css`
    color: ${theme.colors.red};
  `};
`;

type TextProps = {
  type: 'info' | 'success' | 'error';
}

export const Text = styled.Text<TextProps>`
  flex: 1;
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  text-align: justify;
  margin-left: 8px;

  ${({ type, theme }) => type === 'info' &&
    css`
      color: ${theme.colors.cyan};
    `};

  ${({ type, theme }) => type === 'success' &&
    css`
      color: ${theme.colors.green};
    `};

  ${({ type, theme }) => type === 'error' &&
    css`
      color: ${theme.colors.red};
    `};
`;

export const ButtonWrapper = styled.View`
  margin-top: 16px;
`;

export const Button = styled.Pressable.attrs<PressableProps>(({ theme }) => ({
  android_disableSound: true, // Android
}))`
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  align-items: center;

  ${({ disabled }) => disabled &&
    css`
      opacity: 0.7;
    `};
`;

export const ButtonText = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.white};
`;
