import React from 'react';
import { Meta } from '@storybook/react';
import SessionCard from './SessionCard';
import { Button, Classes, H5 } from '@blueprintjs/core';

export default {
  title: 'Components/SessionCard',
  component: SessionCard,
} as Meta;

const children: React.ReactNode = (
  <>
    <H5>
      <a href="#">Analytical applications</a>
    </H5>
    <p>
      User interfaces that enable people to interact smoothly with data, ask
      better questions, and make better decisions.
    </p>
    <Button text="Explore products" className={Classes.BUTTON} />
  </>
);

export const Default = {
  args: {
    children: children,
  },
};
