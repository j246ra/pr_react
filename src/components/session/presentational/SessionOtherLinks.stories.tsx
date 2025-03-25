import React from 'react';
import { Meta } from '@storybook/react';
import SessionOtherLinks from '@session/presentational/SessionOtherLinks';
import SessionCard from '@session/presentational/SessionCard';

export default {
  title: 'Session/Presentational/SessionOtherLinks',
  component: SessionOtherLinks,
  decorators: [
    (Story) => (
      <SessionCard>
        <Story />
      </SessionCard>
    ),
  ],
} as Meta;

export const Default = {
  args: {
    passwordForgetEnabled: true,
    signUpEnabled: true,
  },
};
