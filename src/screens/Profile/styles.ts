import styled, { css } from 'styled-components/native';
import { Platform, StatusBar } from 'react-native';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import {
  BorderlessButton,
  BorderlessButtonProps,
} from 'react-native-gesture-handler';

export const Container = styled.KeyboardAvoidingView.attrs({
  keyboardVerticalOffset: -getBottomSpace(),
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
      padding: 24px 24px 16px;
    `};
`;

export const Header = styled.View`
  width: 100%;
  align-items: center;
  position: relative;
`;

export const MenuButton = styled(BorderlessButton).attrs<BorderlessButtonProps>(({ theme }) => ({
  activeOpacity: 0.5, // iOS Only
  borderless: false, // Android Only
  rippleColor: theme.colors.placeholder, // Android Only
}))`
  position: absolute;
  top: 0;
  right: 0;
`;

export const MenuIcon = styled(Feather)`
  font-size: ${RFValue(36)}px;
  color: ${({ theme }) => theme.colors.white};
`;

export const AvatarButton = styled(BorderlessButton).attrs<BorderlessButtonProps>(({ theme }) => ({
  activeOpacity: 0.5, // iOS Only
  borderless: false, // Android Only
  rippleColor: theme.colors.placeholder, // Android Only
}))`
  align-items: center;
  justify-content: center;
  width: ${RFValue(80)}px;
  height: ${RFValue(80)}px;
  border-radius: ${RFValue(40)}px;
`;

export const Photo = styled.Image`
  width: ${RFValue(80)}px;
  height: ${RFValue(80)}px;
  border-radius: ${RFValue(40)}px;
`;

export const EditIcon = styled(Feather)`
  position: absolute;
  bottom: -4px;
  right: -4px;
  font-size: ${RFValue(24)}px;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.background};
`;

export const UserName = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.white};
  margin-top: 8px;
`;

export const UserEmail = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.white};
`;

// export const Form = styled.ScrollView.attrs({
//   contentContainerStyle: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     // paddingBottom: Platform.OS === 'android' ? 24 : 0,
//   },
//   showsVerticalScrollIndicator: false,
// })``;

export const Form = styled.View`
  flex: 1;
  justify-content: center;
`;

export const InputWrapper = styled.View`
  margin-bottom: 8px;
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.purple};
  margin-left: 16px;
`;

export const ButtonWrapper = styled.View`
  margin-top: 16px;
`;
