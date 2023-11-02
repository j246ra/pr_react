import React from 'react';
import { Meta } from '@storybook/react';
import PasswordEdit from './PasswordEdit';

export default {
  title: 'Session/Container/PasswordEdit',
  component: PasswordEdit,
} as Meta;

export const Default = () => <PasswordEdit />;
