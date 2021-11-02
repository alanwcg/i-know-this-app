import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import {
  Container,
  ButtonTitle,
  Loading,
} from './styles';

interface ButtonProps extends RectButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  color?: boolean;
}

export function Button({
  title,
  onPress,
  loading,
  ...rest
}: ButtonProps) {
  return (
    <Container enabled={!loading} onPress={onPress} {...rest}>
      {loading ? (
        <Loading />
      ) : (
        <ButtonTitle>{title}</ButtonTitle>
      )}
    </Container>
  );
}
