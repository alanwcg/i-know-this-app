import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar, RefreshControl, Alert } from 'react-native';
import { useTheme } from 'styled-components';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import axios from 'axios';

import { MainStackParamList } from '../../routes/main.routes';
import { DrawerParamList } from '../../routes/drawer.routes';
import { api } from '../../services/api';
import { Technology } from '../../types/Technology';
import { EmptyList } from '../../components/EmptyList';
import { Header } from '../../components/Header';
import { Spinner } from '../../components/Spinner';

import {
  Container,
  Content,
  Title,
  SpinnerContainer,
  TechnologiesList,
  TechButton,
  TechIcon,
  TechName,
} from './styles';

// type HomeScreenNavigationProp = NativeStackNavigationProp<
//   MainStackParamList,
//   'Home'
// >;

type HomeScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<MainStackParamList, 'Home'>,
  DrawerNavigationProp<DrawerParamList>
>;

export function Home() {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const theme = useTheme();
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const openDrawer = useCallback(() => {
    navigation.openDrawer();
  }, []);

  async function fetchTechnologies() {
    try {
      setIsLoading(true);

      const response = await api.get('/technologies');

      setTechnologies(response.data);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        Alert.alert(error.response?.data.message);
      }
      setIsLoading(false);
    }
  }

  async function refetchTechnologies() {
    try {
      setIsRefreshing(true);

      const response = await api.get('/technologies');

      setTechnologies(response.data);

      setIsRefreshing(false);
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        Alert.alert(error.response?.data.message);
      }
      setIsRefreshing(false);
    }
  }

  useEffect(() => {
    fetchTechnologies();
  }, []);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.background}
      />

      <Header openDrawer={openDrawer} />

      <Content>
        <Title>Tecnologias</Title>

        {isLoading ? (
          <SpinnerContainer>
            <Spinner />
          </SpinnerContainer>
        ) : (
          <TechnologiesList
            keyExtractor={tech => tech.id}
            data={technologies}
            initialNumToRender={10}
            renderItem={({ item: tech }) => (
              <TechButton
                key={tech.id}
                onPress={() => navigation.push('Technology', {
                  tech_id: tech.id,
                  tech_name: tech.name,
                })}
              >
                <TechIcon name="logo-react" />
                <TechName>{tech.name}</TechName>
              </TechButton>
            )}
            refreshControl={
              <RefreshControl
                onRefresh={refetchTechnologies}
                refreshing={isRefreshing}
                colors={[theme.colors.purple]} // Android ONLY
                tintColor={theme.colors.white} // iOS ONLY
              />
            }
            ListEmptyComponent={<EmptyList />}
          />
        )}
      </Content>
    </Container>
  );
}
