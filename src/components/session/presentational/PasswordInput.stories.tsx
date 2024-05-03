import { Meta } from '@storybook/react';
import PasswordInput from './PasswordInput';

export default {
  title: 'Session/Presentational/PasswordInput',
  component: PasswordInput,
} as Meta;

export const Default = {
  args: {
    value: '',
    onChange: () => {},
  },
};

export const WithPlaceholder = {
  args: {
    value: '',
    onChange: () => {},
    placeholder: 'パスワードを入力してください',
  },
};

export const Optional = {
  args: {
    value: '',
    onChange: () => {},
    required: false,
  },
};
