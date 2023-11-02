import { Meta } from '@storybook/react';
import BaseLifelogDetailDialog from '@lifelog/presentational/BaseLifelogDetailDialog';
import { lifelog } from '@lib/faker/lifelog';

export default {
  title: 'Lifelog/presentational/BaseLifelogDetailDialog',
  component: BaseLifelogDetailDialog,
} as Meta;

export const Default = {
  args: {
    isOpen: true,
    log: lifelog(),
  },
};
