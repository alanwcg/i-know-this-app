import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignIn } from '../screens/SignIn';
import { SignUp } from '../screens/SignUp';
import { ForgotPassword } from '../screens/ForgotPassword';

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
}

const { Navigator, Screen } = createNativeStackNavigator<AuthStackParamList>();

export function AuthRoutes() {
  return (
    <Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignUp" component={SignUp} />
      <Screen name="ForgotPassword" component={ForgotPassword} />
    </Navigator>
  );
}