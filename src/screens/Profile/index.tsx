import React, { useState, useEffect } from 'react';
import {
  Platform,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { useTheme } from 'styled-components';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

import { DrawerParamList } from '../../routes/drawer.routes';
import { api } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';
import { Spinner } from '../../components/Spinner';

import {
  Container,
  Content,
  Header,
  MenuButton,
  MenuIcon,
  AvatarButton,
  Photo,
  EditIcon,
  UserName,
  UserEmail,
  Form,
  InputWrapper,
  Icon,
  ButtonWrapper,
} from './styles';


type EditProfileFormData = {
  cpf: string;
}

type ProfileScreenNavigationProp = DrawerNavigationProp<
  DrawerParamList,
  'Profile'
>;

const editProfileFormDataSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string()
    .required('E-mail obrigatório')
    .email('E-mail inválido'),
});

export function Profile() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(editProfileFormDataSchema),
  });
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const theme = useTheme();
  const { user, updateUser } = useAuth();

  const handleEditProfile: SubmitHandler<EditProfileFormData> = async data => {
    try {
      const response = await api.put(`/users/${user?.id}`, {
        ...data,
      });

      updateUser(response.data);

      Alert.alert('Usuário atualizado com sucesso.');
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        Alert.alert(error.response?.data.message);
      }
    }
  }

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      try {
        setIsLoading(true);

        const data = new FormData();

        data.append('avatar', {
          type: 'image/jpg',
          name: `avatar.jpg`,
          uri: result.uri,
        });

        await api.patch('users/avatar', data);

        const response = await api.get('users/me');

        console.log(response.data);

        updateUser(response.data);
        setIsLoading(false);

        Alert.alert('Avatar atualizado com sucesso.');
      } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
          Alert.alert(error.response?.data.message);
        }
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Desculpa, precisamos de permissões de camera para atualizar seu avatar.');
        }
      }
    })();
  }, []);

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.background}
      />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Content>
          <Header>
            <MenuButton onPress={() => navigation.openDrawer()}>
              <MenuIcon name="menu" />
            </MenuButton>

            <AvatarButton onPress={pickImage}>
              {isLoading ? (
                <Spinner />
              ) : (
                <>
                  <Photo
                    source={{
                      uri: user && user.avatar_url
                        ? user.avatar_url
                        : `https://ui-avatars.com/api/?name=${user ? user.name : 'User'}&background=bd93f9`
                    }}
                  />

                  <EditIcon name="edit" />
                </>
              )}

            </AvatarButton>

            {user && (
              <>
                <UserName>{user.name}</UserName>
                <UserEmail>{user.email}</UserEmail>
              </>
            )}
          </Header>

          <Form>
            <InputWrapper>
              <Input
                name="name"
                control={control}
                placeholder="Nome"
                autoCapitalize="words"
                autoCorrect={false}
                error={errors.name && errors.name.message}
                defaultValue={user ? user.name : ''}
                icon={() => <Icon name="user" />}
                returnKeyType="next"
                onSubmitEditing={() => setFocus('email')}
              />
            </InputWrapper>

            <InputWrapper>
              <Input
                name="email"
                control={control}
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                error={errors.email && errors.email.message}
                defaultValue={user ? user.email : ''}
                icon={() => <Icon name="mail" />}
                returnKeyType="send"
                onSubmitEditing={handleSubmit(handleEditProfile)}
              />
            </InputWrapper>

            <ButtonWrapper>
              <Button
                title="Salvar"
                onPress={handleSubmit(handleEditProfile)}
                loading={isSubmitting}
              />
            </ButtonWrapper>
          </Form>
        </Content>
      </TouchableWithoutFeedback>
    </Container>
  );
}
