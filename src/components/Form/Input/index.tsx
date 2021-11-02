import React, { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { TextInputProps } from 'react-native';
import { SvgProps } from 'react-native-svg';

import {
  Container,
  TextInput,
  EyeButton,
  PasswordIcon,
  Error,
} from './styles';

interface InputProps extends TextInputProps {
  name: string;
  control: Control;
  error: string;
  isPassword?: boolean;
  icon?: React.FC<SvgProps>;
}

export function Input({
  name,
  control,
  error,
  isPassword,
  icon: Icon,
  ...rest
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Container isFocused={isFocused} hasError={!!error}>
        {Icon && <Icon />}

        <Controller
          name={name}
          control={control}
          render={({ field: { ref, onChange, onBlur, value }}) => (
            <TextInput
              ref={ref}
              value={value}
              onChangeText={onChange}
              secureTextEntry={isPassword ? !showPassword : false}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                setIsFocused(false);
                onBlur();
              }}
              {...rest} 
            />
          )}
        />

        {isPassword && (
          <>
            {showPassword ? (
              <EyeButton onPress={() => setShowPassword(false)}>
                <PasswordIcon name="eye" />
              </EyeButton>
            ) : (
              <EyeButton onPress={() => setShowPassword(true)}>
                <PasswordIcon name="eye-off" />
              </EyeButton>
            )}
          </>
        )}
      </Container>

      {error && <Error>{error}</Error>}
    </>
  );
}
