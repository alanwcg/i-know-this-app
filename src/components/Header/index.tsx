import React from 'react';

import { User } from '../../types/User';
import { useAuth } from '../../hooks/useAuth';

import {
  Container,
  Photo,
  GreetingsContainer,
  Greetings,
  UserName,
  MenuButton,
  MenuIcon,
} from './styles';

type HeaderProps = {
  openDrawer: () => void;
}

export function Header({ openDrawer }: HeaderProps) {
  const { user } = useAuth();

  return (
    <Container>
      <Photo
        source={{
          uri: user && user.avatar_url
            ? user.avatar_url
            : `https://ui-avatars.com/api/?name=${user ? user.name : 'Usuário'}&background=bd93f9`
        }}
      />

      <GreetingsContainer>
        <Greetings>Olá,</Greetings>
        <UserName>{user ? user.name : 'Usuário'}</UserName>
      </GreetingsContainer>

      <MenuButton onPress={openDrawer}>
        <MenuIcon name="menu" />
      </MenuButton>
    </Container>
  );
}
