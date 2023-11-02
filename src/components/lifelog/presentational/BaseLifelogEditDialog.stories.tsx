import { Meta } from '@storybook/react';
import BaseLifelogEditDialog from '@lifelog/presentational/BaseLifelogEditDialog';
import { lifelog } from '@lib/faker/lifelog';

export default {
  title: 'Lifelog/Presentational/BaseLifelogEditDialog',
  component: BaseLifelogEditDialog,
} as Meta;

export const Default = {
  args: {
    isOpen: true,
    lifelog: lifelog(),
    detailRows: 8,
  },
};
