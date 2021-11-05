import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const EmptyListIcon = styled(MaterialCommunityIcons)`
font-size: ${RFValue(48)}px;
color: ${({ theme }) => theme.colors.white};
`;

export const EmptyListText = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.white};
`;
