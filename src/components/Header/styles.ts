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
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
`;

export const Photo = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  border-radius: ${RFValue(8)}px;
`;

export const GreetingsContainer = styled.View`
  margin-left: 16px;
`;

export const Greetings = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.white};
`;

export const UserName = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.white};
`;

export const MenuButton = styled(BorderlessButton).attrs<BorderlessButtonProps>(({ theme }) => ({
  activeOpacity: 0.5, // iOS Only
  borderless: false, // Android Only
  rippleColor: theme.colors.placeholder, // Android Only
}))`
  margin-left: auto;
  border-radius: 8px;
`;

export const MenuIcon = styled(Feather)`
  font-size: ${RFValue(36)}px;
  color: ${({ theme }) => theme.colors.white};
`;