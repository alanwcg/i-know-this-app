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

import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';

import {
  Container,
  LogoWrapper,
  LogoPlaceholder, // Trocar pela Logo
  Form,
  InputWrapper,
  Icon,
  ButtonWrapper,
} from './styles';

type SignInFormData = {
  email: string;
  password: string;
}

const signInFormDataSchema = yup.object().shape({
  email: yup.string()
    .required('E-mail obrigatório')
    .email('E-mail inválido'),
  password: yup.string()
    .required('Senha obrigatória'),
});

export function SignIn() {
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signInFormDataSchema),
  });

  const handleSignIn: SubmitHandler<SignInFormData> = async data => {
    await new Promise(resolver => setTimeout(() => resolver(undefined), 3000));

    console.log(data);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.colors.background}
        />

        <LogoWrapper>
         <LogoPlaceholder>Placeholder</LogoPlaceholder>
        </LogoWrapper>

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
              returnKeyType="send"
              onSubmitEditing={handleSubmit(handleSignIn)}
            />
          </InputWrapper>

          <ButtonWrapper>
            <Button
              title="Entrar"
              onPress={handleSubmit(handleSignIn)}
              loading={isSubmitting}
            />
          </ButtonWrapper>
        </Form>
      </Container>
    </TouchableWithoutFeedback>
  );
}
