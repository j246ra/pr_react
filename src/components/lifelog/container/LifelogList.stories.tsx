import { Meta } from '@storybook/react';
import LifelogList from './LifelogList';
import Header from '@src/components/Header';
import { Toaster } from 'react-hot-toast';
import BaseLayout from '@src/components/BaseLayout';
import { lifelogMocks } from '@lib/storybook/lifelog';

export default {
  title: 'Lifelog/Container/LifelogList',
  component: LifelogList,
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

const { index, loading } = lifelogMocks();

export const Default: Meta<typeof LifelogList> = () => <LifelogList />;
Default.parameters = {
  msw: index(),
};

export const Loading: Meta<typeof LifelogList> = () => <LifelogList />;
Loading.parameters = {
  msw: loading(),
};
