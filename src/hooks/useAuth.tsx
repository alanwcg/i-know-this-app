import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { api } from '../services/api';
import { Alert } from 'react-native';

type User = {
  name: string;
  email: string;
  avatar_url: string;
}

type SignInCredentials = {
  email: string;
  password: string;
}

type AuthContextData = {
  user: User | undefined;
  isAuthenticated: boolean;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
}

type AuthProviderProps = {
  children: ReactNode;
}

const userKey = '@IKnowThis:user';
const tokenKey = '@IKnowThis:token';
const refreshTokenKey = '@IKnowThis:refresh_token';

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/sessions/authenticate', {
        email,
        password,
      });

      const { user, token, refresh_token } = response.data;

      setUser(user);

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      await AsyncStorage.multiSet([
        [userKey, JSON.stringify(user)],
        [tokenKey, JSON.stringify(token)],
        [refreshTokenKey, JSON.stringify(refresh_token)],
      ]);
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        Alert.alert(error.response?.data.message);
      }
    }
  }

  async function signOut() {
    await AsyncStorage.multiRemove([
      userKey,
      tokenKey,
      refreshTokenKey,
    ]);

    setUser(undefined);
  }

  useEffect(() => {
    async function loadStorageData() {
      const [[, user], [, token]] = await AsyncStorage.multiGet([
        userKey,
        tokenKey,
      ]);

      if (token && user) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        setUser(JSON.parse(String(user)));
      }
    }

    loadStorageData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
