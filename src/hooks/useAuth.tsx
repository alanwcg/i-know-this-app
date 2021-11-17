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
import { useModal } from './useModal';

type User = {
  id: string;
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
  updateUser: (data: User) => void;
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

  const { openModal } = useModal();

  function updateUser(data: User) {
    setUser(data);
  }

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
        openModal({
          message: error.response?.data.message,
          type: 'error',
        });
      }
    }
  }

  async function signOut() {
    await AsyncStorage.multiRemove([userKey, tokenKey, refreshTokenKey]);

    setUser(undefined);
  }

  useEffect(() => {
    async function loadStorageData() {
      const [[, user], [, token]] = await AsyncStorage.multiGet([
        userKey,
        tokenKey,
      ]);

      if (token && user) {
        api.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(String(token))}`;

        setUser(JSON.parse(String(user)));
      }
      // const token = await AsyncStorage.getItem(tokenKey);

      // if (token) {
      //   api.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(String(token))}`;

      //   const response = await api.get('/users/me');

      //   setUser(response.data);
      // }
    }

    loadStorageData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, updateUser, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
