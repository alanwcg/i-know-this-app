import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { Control, useForm } from 'react-hook-form';
import { ThemeProvider } from 'styled-components/native';

import { Input } from '.';
import theme from '../../../styles/theme';

function InputWrapper() {
  const { control } = useForm();

  return (
    <ThemeProvider theme={theme}>
      <Input
        testID="email-input"
        name="email"
        control={control}
        error=""
      />
    </ThemeProvider>
  );
};

describe('Input Component', () => {
  it('must have specific border color when focused', () => {
    const { getByTestId } = render(
      <InputWrapper />,
    );

    const input = getByTestId('input-wrapper');
    const emailInput = getByTestId('email-input');
    fireEvent.press(emailInput);
    console.log(emailInput.props);
    console.log(input.props);
    
    // expect(emailInput.props.style[0].borderColor).toEqual(theme.colors.purple);
  });
});
