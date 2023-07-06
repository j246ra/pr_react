import { Meta } from '@storybook/react';
import Lifelogs from './Lifelogs';
import { Story } from '@storybook/blocks';
import { Toaster } from 'react-hot-toast';
import Header from '@src/components/Header';
import BaseLayout from '@src/components/BaseLayout';
import { lifelogMocks } from '@lib/storybook/lifelog';

export default {
  title: 'Lifelog/index',
  component: Lifelogs,
  decorators: [
    (Story) => (
      <div className={'App'}>
        <Toaster />
        <Header />
        <BaseLayout>
          <Story />
        </BaseLayout>
      </div>
    ),
  ],
} as Meta;

const { index } = lifelogMocks();
export const Default: Meta<typeof Lifelogs> = () => <Lifelogs />;
Default.parameters = {
  msw: index(),
};
