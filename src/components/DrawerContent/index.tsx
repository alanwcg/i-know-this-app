import React from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';

import LogoSvg from '../../../assets/logo.svg';

import { useAuth } from '../../hooks/useAuth';
import { DrawerParamList } from '../../routes/drawer.routes';

import {
  Container,
  LogoWrapper,
  DrawerItem,
  Icon,
} from './styles';

type DrawerContentNavigationProp = DrawerNavigationProp<DrawerParamList>;

export function DrawerContent({ ...rest }: DrawerContentComponentProps) {
  const { signOut } = useAuth();
  const navigation = useNavigation<DrawerContentNavigationProp>();

  return (
    <Container>
      <LogoWrapper>
        <LogoSvg width={RFValue(150)} height={RFValue(80)} />
      </LogoWrapper>

      <DrawerContentScrollView {...rest}>
        <DrawerItem
          label="Início"
          icon={() => <Icon name="home" />}
          onPress={() => navigation.navigate('MainStack', {
            screen: 'Home',
          })}
        />

        <DrawerItem
          label="Editar Perfil"
          icon={() => <Icon name="user" />}
          onPress={() => navigation.navigate('Profile')}
        />

        <DrawerItem
          label="Sair"
          icon={() => <Icon name="log-out" />}
          onPress={signOut}
        />
      </DrawerContentScrollView>
    </Container>
  );
}
