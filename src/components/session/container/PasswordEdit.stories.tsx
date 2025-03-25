import React from 'react';
import { Meta } from '@storybook/react';
import PasswordEdit from './PasswordEdit';
import { passwordResetHandler } from '@lib/storybook/session';

export default {
  title: 'Session/Container/PasswordEdit',
  component: PasswordEdit,
  parameters: {
    msw: {
      handlers: [passwordResetHandler()],
    },
  },
} as Meta;

export const Default = () => <PasswordEdit />;
