import React from 'react';
import { BorderlessButtonProps } from 'react-native-gesture-handler';

import {
  Container,
  Icon,
} from './styles';

type BackButtonProps = BorderlessButtonProps;

export function BackButton({ ...rest }: BackButtonProps) {
  return (
    <Container {...rest}>
      <Icon name="arrow-left" />
    </Container>
  );
}
