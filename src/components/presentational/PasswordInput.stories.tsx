import React, { ChangeEvent } from 'react';
import { Meta } from '@storybook/react';
import { PasswordInput } from './PasswordInput';

export default {
  title: 'Components/PasswordInput',
  component: PasswordInput,
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
    placeholder: 'パスワードを入力してください',
  },
};

export const Optional = {
  args: {
    value: '',
    onChange: (e: ChangeEvent<HTMLInputElement>) => {},
    required: false,
  },
};
