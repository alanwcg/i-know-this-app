import React, { useEffect } from 'react';

import { api } from '../../services/api';

import {
  Container,
  Title,
} from './styles';

export function Home() {
  useEffect(() => {
    api.get('/users/me').then(response => {
      console.log('/users/me', response.data);
    }).catch(error => console.log(error.response.data.message));
  }, []);

  return (
    <Container>
      <Title>Home Screen</Title>
    </Container>
  );
}
