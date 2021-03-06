import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  BorderlessButton,
  BorderlessButtonProps,
} from 'react-native-gesture-handler';

export const Container = styled.View`
  width: 100%;
`;

type ContentProps = {
  itemIndex: number;
}

export const Content = styled(BorderlessButton).attrs<BorderlessButtonProps>(({ theme }) => ({
  activeOpacity: 0.5, // iOS Only
  borderless: false, // Android Only
  rippleColor: theme.colors.purple, // Android Only
}))<ContentProps>`
  width: 100%;
  flex-direction: row;
  align-items: center;

  ${({ itemIndex }) => itemIndex > 0 &&
    css`
      margin-top: 8px;
    `};
`;

type IconProps = {
  selected: boolean;
}

export const Icon = styled(MaterialCommunityIcons)<IconProps>`
  font-size: ${RFValue(24)}px;

  ${({ selected }) => selected
    ? css`
      color: ${({ theme }) => theme.colors.purple};
    `
    : css`
      color: ${({ theme }) => theme.colors.white};
    `};
`;

type TextProps = {
  isCorrectAnswer?: boolean;
}

export const Text = styled.Text<TextProps>`
  flex: 1;
  text-align: justify;
  margin-left: 16px;
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  
  ${({ isCorrectAnswer }) => isCorrectAnswer
    ? css`
      color: ${({ theme }) => theme.colors.green};
    `
    : css`
      color: ${({ theme }) => theme.colors.white};
    `};
`;
