import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthRoutes } from './auth.routes';
import { useAuth } from '../hooks/useAuth';
import { MainRoutes } from './main.routes';

export function Routes() {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <MainRoutes />
      ) : (
        <AuthRoutes />
      )}
    </NavigationContainer>
  );
}
