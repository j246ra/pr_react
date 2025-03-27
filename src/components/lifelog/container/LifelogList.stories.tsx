import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/test';
import LifelogList from './LifelogList';
import BaseLayout from '@src/components/BaseLayout';
import { lifelogMocks } from '@lib/storybook/lifelog';
import { LIFELOG_LIST_ITEM_TEST_ID as TEST_ID } from '@lib/consts/testId';

type Story = StoryObj<typeof LifelogList>;

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

export const InfiniteScroll: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 非同期ロード完了後、要素が表示されるまで待機
    let scrollContainer = await canvas.findByTestId(
      TEST_ID.TD_STARTED_AT + '20'
    );
    scrollContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    scrollContainer = await canvas.findByTestId(TEST_ID.TD_STARTED_AT + '40');
    scrollContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  },
};
InfiniteScroll.parameters = {
  msw: all(),
};
