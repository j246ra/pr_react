import { Meta } from '@storybook/react';
import LifelogEditDialog from './LifelogEditDialog';
import { lifelog } from '@lib/faker/lifelog';
import { lifelogMocks } from '../../../lib/storybook/lifelog';

export default {
  title: 'Lifelog/Container/LifelogEditDialog',
  component: LifelogEditDialog,
} as Meta;

const { all } = lifelogMocks();

export const Default = {
  args: {
    isOpen: true,
    log: lifelog(),
  },
  parameters: {
    msw: all(),
  },
};
