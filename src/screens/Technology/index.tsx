import React, { useState, useEffect, useCallback } from 'react';
import { Alert, RefreshControl, StatusBar, Modal } from 'react-native';
import { useTheme } from 'styled-components';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import axios from 'axios';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Level } from '../../types/Level';
import { Module } from '../../types/Module';
import { MainStackParamList } from '../../routes/main.routes';
import { api } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import { Header } from '../../components/Header';
import { Spinner } from '../../components/Spinner';
import { EmptyList } from '../../components/EmptyList';
import { ContentOrQuizzModal } from '../../components/ContentOrQuizzModal';

import {
  Container,
  TitleContainer,
  BackButton,
  ArrowLeft,
  Title,
  SpinnerContainer,
  Content,
  LevelContainer,
  LevelButton,
  LevelName,
  Icon,
  ModulesContainer,
  ModuleButton,
  ModuleName,
} from './styles';

type TechnologyScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'Technology'
>;

type TechnologyScreenRouteProp = RouteProp<MainStackParamList, 'Technology'>;

let moduleName = '';

export function Technology() {
  const [levels, setLevels] = useState<Level[]>([]);
  const [modules, setModules] = useState<Module[]>(() => ([
    {
      id: '1',
      name: 'Estado',
      content: '',
    },
    {
      id: '2',
      name: 'Componente',
      content: '',
    }
  ]));
  const [selectedLevel, setSelectedLevel] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modulesContainerAnimation = useSharedValue(0);

  const theme = useTheme();
  const navigation = useNavigation<TechnologyScreenNavigationProp>();
  const { params: { tech_id, tech_name } } = useRoute<TechnologyScreenRouteProp>();
  const { user } = useAuth();

  const showModulesStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(modulesContainerAnimation.value,
        [0, 25, 50, 75, 100],
        [0, .25, .5, .75, 1]
      ),
      transform: [
        {
          translateY: interpolate(modulesContainerAnimation.value,
            [0, 100],
            [-70, -16],
            Extrapolate.CLAMP
          )
        }
      ],
    };
  });

  function onLevelPress(level_id: string) {
    modulesContainerAnimation.value = 0;

    if (selectedLevel === level_id) {
      setSelectedLevel('');
      return;
    }

    setSelectedLevel(level_id);
    modulesContainerAnimation.value = withTiming(100, { duration: 500 });
  }

  function handleOpenModal(module_name: string) {
    moduleName = module_name;
    setIsModalOpen(true);
  }

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleUserFilterChoice = useCallback((filter: string) => {
    //TODO: mandar filtro para a próxima tela
    console.log(filter);
    
    setIsModalOpen(false);

    if (filter === 'content') {
      // navigation.push('Technology', {
      //   subServiceId: id,
      //   serviceType,
      // });
      return;
    }

    if (filter === 'quizz') {
      // navigation.push('Technology', {
      //   subServiceId: id,
      //   serviceType,
      // });
      return;
    }
  }, []);

  async function fetchLevels() {
    try {
      setIsLoading(true);

      const response = await api.get('/levels');

      setLevels(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        Alert.alert(error.response?.data.message);
      }
      setIsLoading(false);
    }
  }

  async function refetchLevels() {
    try {
      setIsRefreshing(true);

      const response = await api.get('/levels');

      setLevels(response.data);
      setIsRefreshing(false);
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        Alert.alert(error.response?.data.message);
      }
      setIsRefreshing(false);
    }
  }

  async function fetchModules() {
    try {
      const response = await api.get('/modules');

      // console.log(response.data);
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        Alert.alert(error.response?.data.message);
      }
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchLevels();
    fetchModules();

    console.log(modules);
  }, []);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.background}
      />

      <Header user={user} />

      <TitleContainer>
        <BackButton onPress={() => navigation.goBack()}>
          <ArrowLeft name="arrow-left" />
        </BackButton>

        <Title>{tech_name}</Title>
      </TitleContainer>

      {isLoading ? (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      ) : (
        <Content
          keyExtractor={level => level.id}
          data={levels}
          initialNumToRender={3}
          renderItem={({ item: level, index }) => (
            <LevelContainer key={level.id} index={index}>
              <LevelButton
                onPress={() => onLevelPress(level.id)}
              >
                <LevelName>{level.name}</LevelName>
                {selectedLevel === level.id
                  ? <Icon name="arrow-up" />
                  : <Icon name="arrow-down" />
                }
              </LevelButton>

              {selectedLevel === level.id && (
                <Animated.View style={showModulesStyle}>
                  <ModulesContainer>
                    {modules.map(module => (
                      <ModuleButton
                        key={module.id}
                        onPress={() => handleOpenModal(module.name)}
                      >
                        <ModuleName>{module.name}</ModuleName>
                      </ModuleButton>
                    ))}
                  </ModulesContainer>
                </Animated.View>
              )}
            </LevelContainer>
          )}
          refreshControl={
            <RefreshControl
              onRefresh={refetchLevels}
              refreshing={isRefreshing}
              colors={[theme.colors.purple]} // Android ONLY
              tintColor={theme.colors.white} // iOS ONLY
            />
          }
          ListEmptyComponent={<EmptyList />}
        />
      )}

      <Modal
        visible={isModalOpen}
        transparent
        animationType="fade"
      >
        <ContentOrQuizzModal
          moduleName={moduleName}
          closeModal={handleCloseModal}
          handleChoice={handleUserFilterChoice}
        />
      </Modal>
    </Container>
  );
}
