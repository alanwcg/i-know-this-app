import React from 'react';
import {
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import { useTheme } from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import { AuthStackParamList } from '../../routes/auth.routes';
import { api } from '../../services/api';
import { useModal } from '../../hooks/useModal';
import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';
import { BackButton } from '../../components/BackButton';

import {
  Container,
  Content,
  Header,
  HeaderTitle,
  Form,
  InputWrapper,
  Icon,
  ButtonWrapper,
} from './styles';

type ForgotPasswordScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'ForgotPassword'
>;

type ForgotPasswordFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const forgotPasswordFormDataSchema = yup.object().shape({
  email: yup.string()
    .required('E-mail obrigatório')
    .email('E-mail inválido'),
});

export function ForgotPassword() {
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(forgotPasswordFormDataSchema),
  });
  const navigation = useNavigation<ForgotPasswordScreenNavigationProp>();
  const { openModal } = useModal();

  const handleSignUp: SubmitHandler<ForgotPasswordFormData> = async data => {
    try {
      const { email } = data;

      await api.post('/password/forgot', {
        email,
      });

      openModal({
        message: 'E-mail enviado. Verifique sua caixa de entrada e siga as instruções para resetar sua senha.',
        type: 'info',
      });

      navigation.goBack();
    } catch (error) {
      console.log(error);
      if(axios.isAxiosError(error)) {
        openModal({
          message: error.response?.data.message,
          type: 'error',
        });
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
            <BackButton onPress={() => navigation.goBack()} />

            <HeaderTitle>Resetar Senha</HeaderTitle>
          </Header>

          <Form>
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
                returnKeyType="send"
                onSubmitEditing={handleSubmit(handleSignUp)}
              />
            </InputWrapper>

            <ButtonWrapper>
              <Button
                title="Resetar"
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
