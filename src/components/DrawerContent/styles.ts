import styled, { css } from 'styled-components/native';
import { Platform, StatusBar } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { DrawerItem as ReactNavigationDrawerItem } from '@react-navigation/drawer';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};

  ${Platform.OS === 'ios'
    ? css`
      padding-top: ${getStatusBarHeight() + 24}px;
    `
    : css`
      padding-top: ${StatusBar.currentHeight! + 24}px;
    `};
`;

export const LogoWrapper = styled.View`
  align-items: center;

  ${Platform.OS === 'android'
    && css`
      margin-bottom: 36px;
    `};
`;

export const DrawerItem = styled(ReactNavigationDrawerItem).attrs(({ theme }) => ({
  labelStyle: {
    fontSize: RFValue(16),
    fontFamily: theme.fonts.regular,
    color: theme.colors.white,
    marginLeft: -16,
  },
  pressOpacity: 0.5, // iOS Only
  pressColor: theme.colors.placeholder, // Android Only
}))``;

export const Icon = styled(Feather)`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.purple};
  margin-left: 16px;
`;
