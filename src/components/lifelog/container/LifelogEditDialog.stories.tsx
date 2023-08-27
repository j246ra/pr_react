import { Meta } from '@storybook/react';
import LifelogEditDialog from './LifelogEditDialog';
import { lifelogMocks } from '@lib/storybook/lifelog';
import LifelogEditDialogProvider from '@providers/LifelogEditDialogProvider';
import LifelogList from '@lifelog/container/LifelogList';

export default {
  title: 'Lifelog/Container/LifelogEditDialog',
  component: LifelogEditDialog,
  decorators: [
    (Story) => (
      <div className={'App'}>
        <LifelogEditDialogProvider>
          <LifelogList />
          <Story />
        </LifelogEditDialogProvider>
      </div>
    ),
  ],
} as Meta;

const { all } = lifelogMocks();

export const Default = {
  args: {
    detailRows: 8,
  },
  parameters: {
    msw: all(),
  },
};
