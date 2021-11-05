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
  user: User | undefined;
}

export function Header({ user }: HeaderProps) {
  const { signOut } = useAuth();

  return (
    <Container>
      <Photo
        source={{
          uri: user && user.avatar_url
            ? user.avatar_url
            : `https://ui-avatars.com/api/?name=AlanCintra&background=bd93f9`
        }}
      />

      <GreetingsContainer>
        <Greetings>Olá,</Greetings>
        <UserName>{user ? user.name : 'Usuário'}</UserName>
      </GreetingsContainer>

      <MenuButton onPress={signOut}>
        <MenuIcon name="menu" />
      </MenuButton>
    </Container>
  );
}
