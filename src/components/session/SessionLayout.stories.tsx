import { Meta } from '@storybook/react';
import SessionLayout from '@session/SessionLayout';
import SessionCard from '@session/presentational/SessionCard';
import { Callout, H2 } from '@blueprintjs/core';

export default {
  title: 'Session/SessionLayout',
  component: SessionLayout,
} as Meta;

export const Default: () => JSX.Element = () => (
  <SessionLayout>
    <SessionCard>
      <H2>LIFELOG</H2>
      <Callout>SessionLayout Component</Callout>
    </SessionCard>
  </SessionLayout>
);
