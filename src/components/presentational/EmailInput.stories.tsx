import React, { ChangeEvent } from 'react';
import { Meta } from '@storybook/react';
import { EmailInput } from './EmailInput';

export default {
  title: 'Components/EmailInput',
  component: EmailInput,
} as Meta;

export const Default = {
  args: {
    value: '',
    onChange: (e: ChangeEvent<HTMLInputElement>) => {},
  },
};

export const WithPlaceholder = {
  args: {
    value: '',
    onChange: (e: ChangeEvent<HTMLInputElement>) => {},
    placeholder: 'メールアドレスを入力してください',
  },
};

export const Required = {
  args: {
    value: '',
    onChange: (e: ChangeEvent<HTMLInputElement>) => {},
    required: true,
  },
};
