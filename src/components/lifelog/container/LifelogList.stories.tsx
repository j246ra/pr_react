import { Meta } from '@storybook/react';
import LifelogList from './LifelogList';
import BaseLayout from '@src/components/BaseLayout';
import { lifelogMocks } from '@lib/storybook/lifelog';

export default {
  title: 'Lifelog/Container/LifelogList',
  component: LifelogList,
  decorators: [
    (Story) => (
      <div className={'App'}>
        <BaseLayout>
          <Story />
        </BaseLayout>
      </div>
    ),
  ],
} as Meta;

const { all, loading, empty } = lifelogMocks();

export const Default: Meta<typeof LifelogList> = () => <LifelogList />;
Default.parameters = {
  msw: all(),
};

export const Loading: Meta<typeof LifelogList> = () => <LifelogList />;
Loading.parameters = {
  msw: loading(),
};

export const Empty: Meta<typeof LifelogList> = () => <LifelogList />;
Empty.parameters = {
  msw: empty(),
};
