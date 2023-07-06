import { Meta } from '@storybook/react';
import LifelogEditDialog from './LifelogEditDialog';
import { lifelog } from '@lib/faker/lifelog';

export default {
  title: 'Lifelog/Container/LifelogEditDialog',
  component: LifelogEditDialog,
} as Meta;

export const Default = {
  args: {
    isOpen: true,
    log: lifelog(),
  },
};
