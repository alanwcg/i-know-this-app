import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosError } from 'axios';

import { api } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { Home } from '../screens/Home';
import { Technology } from '../screens/Technology';

export type MainStackParamList = {
  Home: undefined;
  Technology: { tech_id: string } | undefined;
}

const { Navigator, Screen } = createNativeStackNavigator<MainStackParamList>();

let isRefreshing = false;
let failedRequestsQueue: any = [];

export function MainRoutes() {
  const { signOut } = useAuth();

  api.interceptors.response.use(response => {
    return response;
  }, (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (error.response?.data.message.includes('JWT')) {
        AsyncStorage.getItem('@IKnowThis:refresh_token').then(refreshToken => {
          const originalConfig = error.config;

          if (!isRefreshing) {
            isRefreshing = true;

            api.post('/sessions/refresh-token', {
              refresh_token: JSON.parse(String(refreshToken)),
            })
              .then(response => {
                const { token, refresh_token } = response.data;

                AsyncStorage.multiSet([
                  ['@IKnowThis:token', JSON.stringify(token)],
                  ['@IKnowThis:refresh_token', JSON.stringify(refresh_token)],
                ]);

                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                failedRequestsQueue.forEach((request: any) => request.onSuccess(token));
                failedRequestsQueue = [];
              })
              .catch(err => {
                failedRequestsQueue.forEach((request: any) => request.onFailure(err));
                failedRequestsQueue = [];

                signOut();
              })
              .finally(() => {
                isRefreshing = false;
              });
          }

          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
              onSuccess: (token: string) => {
                originalConfig.headers!['Authorization'] = `Bearer ${token}`;

                resolve(api(originalConfig));
              },
              onFailure: (error: AxiosError) => {
                reject(error);
              },
            });
          });
        });
      } else {
        signOut();
      }
    }

    return Promise.reject(error);
  });

  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Screen name="Home" component={Home} />
      <Screen name="Technology" component={Technology} />
    </ Navigator>
      );
}