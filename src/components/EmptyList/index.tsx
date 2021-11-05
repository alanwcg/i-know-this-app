import React from 'react';

import {
  Container,
  EmptyListIcon,
  EmptyListText,
} from './styles';

export function EmptyList() {
  return (
    <Container>
      <EmptyListIcon name="cloud-search" />

      <EmptyListText>
        Não há dados disponívels.
      </EmptyListText>
    </Container>
  );
}
