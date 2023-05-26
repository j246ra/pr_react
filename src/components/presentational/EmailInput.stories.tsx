import React, { ChangeEvent } from 'react';
import { Story, Meta } from '@storybook/react';
import { EmailInput, EmailInputProps } from './EmailInput';

export default {
  title: 'Components/EmailInput',
  component: EmailInput,
} as Meta;

const Template: Story<EmailInputProps> = (args) => <EmailInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: '',
  onChange: (e: ChangeEvent<HTMLInputElement>) => {},
};

export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = {
  value: '',
  onChange: (e: ChangeEvent<HTMLInputElement>) => {},
  placeholder: 'メールアドレスを入力してください',
};

export const Required = Template.bind({});
Required.args = {
  value: '',
  onChange: (e: ChangeEvent<HTMLInputElement>) => {},
  required: true,
};
