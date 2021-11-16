import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthRoutes } from './auth.routes';
import { useAuth } from '../hooks/useAuth';
import { DrawerRoutes } from './drawer.routes';

export function Routes() {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <DrawerRoutes />
      ) : (
        <AuthRoutes />
      )}
    </NavigationContainer>
  );
}
