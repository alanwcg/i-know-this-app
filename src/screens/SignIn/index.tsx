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

import { AuthStackParamList } from '../../routes/auth.routes';
import { useAuth } from '../../hooks/useAuth';
import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';

import {
  Container,
  Content,
  LogoWrapper,
  LogoPlaceholder, // Trocar pela Logo
  Form,
  InputWrapper,
  Icon,
  ButtonWrapper,
  Footer,
  FooterText,
  SignUpButton,
  SignUpButtonText,
} from './styles';

type SignInScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'SignIn'
>;

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
  const navigation = useNavigation<SignInScreenNavigationProp>();
  const { signIn } = useAuth();

  const handleSignIn: SubmitHandler<SignInFormData> = async data => {
    await signIn(data);
  }

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.background}
      />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Content>
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

          <Footer>
            <FooterText>Não possui conta?</FooterText>

            <SignUpButton onPress={() => navigation.push('SignUp')}>
              <SignUpButtonText>Cadastre-se</SignUpButtonText>
            </SignUpButton>
          </Footer>
        </Content>
      </TouchableWithoutFeedback>
    </Container>
  );
}
