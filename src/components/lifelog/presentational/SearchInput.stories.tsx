import { Meta } from '@storybook/react';
import SearchInput from './SearchInput';
import { lifelogMocks } from '@lib/storybook/lifelog';

export default {
  title: 'Lifelog/Presentational/SearchInput',
  component: SearchInput,
} as Meta;

const { all } = lifelogMocks();

export const Default = {
  args: {
    isShown: true,
  },
  parameters: {
    msw: all(),
  },
};
