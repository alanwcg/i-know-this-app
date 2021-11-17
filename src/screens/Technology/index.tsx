import React, { useState, useEffect, useCallback } from 'react';
import { RefreshControl, StatusBar, Modal } from 'react-native';
import { useTheme } from 'styled-components';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  useNavigation,
  useRoute,
  RouteProp,
  CompositeNavigationProp,
} from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import axios from 'axios';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Technology as TechnologyType } from '../../types/Technology';
import { Level } from '../../types/Level';
import { Module } from '../../types/Module';
import { MainStackParamList } from '../../routes/main.routes';
import { DrawerParamList } from '../../routes/drawer.routes';
import { api } from '../../services/api';
import { useModal } from '../../hooks/useModal';
import { useAuth } from '../../hooks/useAuth';
import { Header } from '../../components/Header';
import { Spinner } from '../../components/Spinner';
import { EmptyList } from '../../components/EmptyList';
import { ContentOrQuizzModal } from '../../components/ContentOrQuizzModal';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Form/Button';

import {
  Container,
  TitleContainer,
  Title,
  SpinnerContainer,
  Content,
  LevelContainer,
  LevelButton,
  LevelName,
  Icon,
  ModulesContainer,
  ButtonWrapper,
} from './styles';

type TechnologyScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<MainStackParamList, 'Technology'>,
  DrawerNavigationProp<DrawerParamList>
>;

type TechnologyScreenRouteProp = RouteProp<MainStackParamList, 'Technology'>;

let module: Module = {
  id: '',
  name: '',
  content: '',
  links: '',
  level_id: '',
  technology_id: '',
  technology: {} as TechnologyType,
  userModules: [],
};

export function Technology() {
  const [levels, setLevels] = useState<Level[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modulesContainerAnimation = useSharedValue(0);

  const navigation = useNavigation<TechnologyScreenNavigationProp>();
  const { params: { tech_id, tech_name } } = useRoute<TechnologyScreenRouteProp>();
  const theme = useTheme();
  const { openModal } = useModal();
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

  const openDrawer = useCallback(() => {
    navigation.openDrawer();
  }, []);

  function onLevelPress(level_id: string) {
    modulesContainerAnimation.value = 0;

    if (selectedLevel === level_id) {
      setSelectedLevel('');
      return;
    }

    setSelectedLevel(level_id);
    modulesContainerAnimation.value = withTiming(100, { duration: 500 });
  }

  function handleOpenModal(selectedModule: Module) {
    const userModule = selectedModule.userModules.find(
      item => item.user_id === user?.id && item.module_id === selectedModule.id
    );
      
    module = {
      ...selectedModule,
      userModules: [userModule!],
    };

    setIsModalOpen(true);
  }

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleUserFilterChoice = useCallback((filter: string) => {
    setIsModalOpen(false);

    if (filter === 'content') {
      navigation.push('ModuleContent', {
        module,
      });
      return;
    }

    if (filter === 'quizz') {
      navigation.push('ModuleQuizz', {
        module,
      });
      return;
    }
  }, []);

  async function fetchLevelsAndModules() {
    try {
      setIsLoading(true);

      const response = await api.get('/levels');

      const res = await api.get('/modules', {
        params: {
          technology_id: tech_id,
        }
      });

      setLevels(response.data);
      setModules(res.data);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        openModal({
          message: error.response?.data.message,
          type: 'error',
        });
      }
      setIsLoading(false);
    }
  }

  async function refetchLevelsAndModules() {
    try {
      setIsRefreshing(true);

      const response = await api.get('/levels');

      const res = await api.get('/modules', {
        params: {
          technology_id: tech_id,
        }
      });

      setLevels(response.data);
      setModules(res.data);

      setIsRefreshing(false);
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        openModal({
          message: error.response?.data.message,
          type: 'error',
        });
      }
      setIsRefreshing(false);
    }
  }

  useEffect(() => {
    fetchLevelsAndModules();
  }, []);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.background}
      />

      <Header openDrawer={openDrawer} />

      <TitleContainer>
        <BackButton onPress={() => navigation.goBack()} />

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
                    {modules.map(module => {
                      if (module.level_id === level.id) {
                        return (
                          <ButtonWrapper key={module.id}>
                            <Button
                              title={module.name}
                              onPress={() => handleOpenModal(module)}
                            />
                          </ButtonWrapper>
                        )
                      }

                    })}
                  </ModulesContainer>
                </Animated.View>
              )}
            </LevelContainer>
          )}
          refreshControl={
            <RefreshControl
              onRefresh={refetchLevelsAndModules}
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
          module={module}
          closeModal={handleCloseModal}
          handleChoice={handleUserFilterChoice}
        />
      </Modal>
    </Container>
  );
}
