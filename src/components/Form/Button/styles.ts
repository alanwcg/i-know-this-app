import styled, { css } from 'styled-components/native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(RectButton).attrs<RectButtonProps>({
  activeOpacity: 0.2, // iOS Only
})`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.purple};

  padding: 16px;
  border-radius: 8px;
  align-items: center;

  ${({ enabled }) => !enabled &&
    css`
      opacity: 0.7;
    `};
`;

export const ButtonTitle = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.white};
`;

export const Loading = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.colors.white,
}))``;
