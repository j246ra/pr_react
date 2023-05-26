import React from 'react';
import { Meta } from '@storybook/react';
import Login from '@container/Login';

export default {
  title: 'Container/Login',
  component: Login,
} as Meta;

export const Default = () => <Login />;
