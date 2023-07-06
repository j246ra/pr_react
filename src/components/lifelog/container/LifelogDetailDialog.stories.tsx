import { Meta } from '@storybook/react';
import LifelogDetailDialog from './LifelogDetailDialog';
import { lifelog } from '@lib/faker/lifelog';

export default {
  title: 'Lifelog/Container/LifelogDetailDialog',
  component: LifelogDetailDialog,
} as Meta;

export const Default = {
  args: {
    isOpen: true,
    log: lifelog(),
  },
};
