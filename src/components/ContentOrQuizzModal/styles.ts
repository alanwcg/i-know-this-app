import styled, { css } from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { PressableProps } from 'react-native';
import { shade } from 'polished';

export const Container = styled.Pressable`
  flex: 1;
  align-items: center;
  justify-content: center;
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

export const CloseButton = styled.Pressable.attrs<PressableProps>(({ theme }) => ({
  android_disableSound: true, // Android
  android_ripple: {
    color: theme.colors.placeholder,
    borderless: true,
    radius: 25,
  },
  hitSlop: 8,
}))`
  position: absolute;
  top: 8px;
  right: 8px;
`;

export const CloseIcon = styled(MaterialCommunityIcons)`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.white};
`;

export const Text = styled.Text`
  font-size: ${RFValue(24)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.purple};
  text-align: center;
`;

export const ProgressionBar = styled.View`
  position: relative;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${(RFValue(36))}px;
  margin: 16px 0;
  border-radius: 8px;
  background-color: ${({ theme }) => shade(0.5, theme.colors.green)};
`;

type UserProgressionBarProps = {
  width: number;
}

export const UserProgressionBar = styled.View<UserProgressionBarProps>`
  position: absolute;
  left: 0;
  width: ${({ width }) => width}%;
  height: ${(RFValue(36))}px;
  background-color: ${({ theme }) => theme.colors.green};
  ${({ width }) => width < 100
    && css`
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
    `};

  ${({ width }) => width === 100
    && css`
      border-radius: 8px;
    `};
`;

export const Progression = styled.Text`
  font-size: ${RFValue(24)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.purple};
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Button = styled.Pressable.attrs<PressableProps>(({ theme }) => ({
  android_disableSound: true, // Android
}))`
  width: 47%;
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
