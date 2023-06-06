import React from 'react';
import { Meta } from '@storybook/react';
import PasswordEdit from '@container/PasswordEdit';

export default {
  title: 'Container/PasswordEdit',
  component: PasswordEdit,
} as Meta;

export const Default = () => <PasswordEdit />;
