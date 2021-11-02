import styled, { css } from 'styled-components/native';
import {
  TextInput as RNTextInput,
  TextInputProps,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import {
  BorderlessButton,
  BorderlessButtonProps,
} from 'react-native-gesture-handler';

type ContainerProps = {
  isFocused: boolean;
  hasError: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  flex-direction: row;
  align-items: center;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.gray};

  ${({ isFocused }) => isFocused &&
    css`
      border-width: 1px;
      border-color: ${({ theme }) => theme.colors.purple};
    `};

  ${({ hasError }) => hasError &&
    css`
      border-width: 1px;
      border-color: ${({ theme }) => theme.colors.red};
    `};
`;

export const TextInput = styled(RNTextInput).attrs<TextInputProps>(({ theme }) => ({
  placeholderTextColor: theme.colors.placeholder,
}))`
  flex: 1;
  padding: 16px;
  border-radius: 8px;

  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.white};
`;

export const EyeButton = styled(BorderlessButton).attrs<BorderlessButtonProps>(({ theme }) => ({
  activeOpacity: 0.5, // iOS Only
  rippleColor: theme.colors.placeholder, // Android Only
}))`
  margin-right: 16px;
`;

export const PasswordIcon = styled(Feather)`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.purple};
`;

export const Error = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.red};
  margin-top: 4px;
`;
