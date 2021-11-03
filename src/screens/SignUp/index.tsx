import React from 'react';
import {
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Alert,
} from 'react-native';
import { useTheme } from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import { api } from '../../services/api';
import { AuthStackParamList } from '../../routes/auth.routes';
import { useAuth } from '../../hooks/useAuth';
import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';

import {
  Container,
  Content,
  Header,
  BackButton,
  ArrowLeft,
  HeaderTitle,
  Form,
  InputWrapper,
  Icon,
  ButtonWrapper,
} from './styles';

type SignUpScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'SignUp'
>;

type SignUpFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const signUpFormDataSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string()
    .required('E-mail obrigatório')
    .email('E-mail inválido'),
  password: yup.string()
    .required('Senha obrigatória')
    .min(6, 'Senha precisa ter no mínimo 6 caracteres'),
  password_confirmation: yup.string()
    .required('As senhas precisam ser iguais')
    .oneOf([
      null,
      yup.ref('password')
  ], 'As senhas precisam ser iguais'),
});

export function SignUp() {
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signUpFormDataSchema),
  });
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const { signIn } = useAuth();

  const handleSignUp: SubmitHandler<SignUpFormData> = async data => {
    try {
      const { name, email, password } = data;

      await api.post('/users', {
        name,
        email,
        password,
      });

      navigation.goBack();

      await signIn({ email, password });
    } catch (error) {
      console.log(error);
      if(axios.isAxiosError(error)) {
        Alert.alert(error.response?.data.message);
      }
    }
  }

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.background}
      />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Content>
          <Header>
            <BackButton onPress={() => navigation.goBack()}>
              <ArrowLeft name="arrow-left" />
            </BackButton>

            <HeaderTitle>Cadastro</HeaderTitle>
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
                icon={() => <Icon name="mail" />}
                returnKeyType="next"
                onSubmitEditing={() => setFocus('password')}
              />
            </InputWrapper>

            <InputWrapper>
              <Input
                name="password"
                control={control}
                placeholder="Senha"
                isPassword
                error={errors.password && errors.password.message}
                icon={() => <Icon name="lock" />}
                returnKeyType="next"
                onSubmitEditing={() => setFocus('password_confirmation')}
              />
            </InputWrapper>

            <InputWrapper>
              <Input
                name="password_confirmation"
                control={control}
                placeholder="Repita a Senha"
                isPassword
                error={
                  errors.password_confirmation &&
                  errors.password_confirmation.message
                }
                icon={() => <Icon name="lock" />}
                returnKeyType="send"
                onSubmitEditing={handleSubmit(handleSignUp)}
              />
            </InputWrapper>

            <ButtonWrapper>
              <Button
                title="Cadastrar"
                onPress={handleSubmit(handleSignUp)}
                loading={isSubmitting}
              />
            </ButtonWrapper>
          </Form>
        </Content>
      </TouchableWithoutFeedback>
    </Container>
  );
}
