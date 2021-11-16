import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigatorScreenParams } from '@react-navigation/native';

import { DrawerContent } from '../components/DrawerContent'
import { MainRoutes, MainStackParamList } from './main.routes';
import { Profile } from '../screens/Profile';

export type DrawerParamList = {
  MainStack: NavigatorScreenParams<MainStackParamList>,
  Profile: undefined,
}

const { Navigator, Screen } = createDrawerNavigator<DrawerParamList>();

export function DrawerRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'front'
      }}
      drawerContent={props => <DrawerContent {...props}/>}
    >
      <Screen name="MainStack" component={MainRoutes} />
      <Screen name="Profile" component={Profile} />
    </Navigator>
  );
}
