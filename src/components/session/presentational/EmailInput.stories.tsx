import { Meta } from '@storybook/react';
import { EmailInput } from './EmailInput';

export default {
  title: 'Session/Presentational/EmailInput',
  component: EmailInput,
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
    placeholder: 'メールアドレスを入力してください',
  },
};

export const Optional = {
  args: {
    value: '',
    onChange: () => {},
    required: false,
  },
};
