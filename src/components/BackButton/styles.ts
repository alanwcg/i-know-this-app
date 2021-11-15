import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import {
  BorderlessButton,
  BorderlessButtonProps,
} from 'react-native-gesture-handler';

export const Container = styled(BorderlessButton)
  .attrs<BorderlessButtonProps>(({ theme }) => ({
    activeOpacity: 0.5, // iOS
    rippleColor: theme.colors.purple, // Android
  }))`
    position: absolute;
    top: ${RFValue(-3)}px;
    left: 0;
  `;

export const Icon = styled(Feather)`
  font-size: ${RFValue(36)}px;
  color: ${({ theme }) => theme.colors.purple};
`;