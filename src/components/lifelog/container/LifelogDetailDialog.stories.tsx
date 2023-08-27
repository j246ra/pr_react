import { Meta } from '@storybook/react';
import LifelogDetailDialog from './LifelogDetailDialog';
import LifelogList from '@lifelog/container/LifelogList';
import LifelogDetailDialogProvider from '@providers/LifelogDetailDialogProvider';
import { lifelogMocks } from '@lib/storybook/lifelog';

export default {
  title: 'Lifelog/Container/LifelogDetailDialog',
  component: LifelogDetailDialog,
  decorators: [
    (Story) => (
      <div className={'App'}>
        <LifelogDetailDialogProvider>
          <LifelogList />
          <Story />
        </LifelogDetailDialogProvider>
      </div>
    ),
  ],
} as Meta;

const { all } = lifelogMocks();

export const Default = {
  parameters: {
    msw: all(),
  },
};
