import { Meta } from '@storybook/react';
import SearchInput from './SearchInput';

export default {
  title: 'Lifelog/Presentational/SearchInput',
  component: SearchInput,
} as Meta;

export const Default = {
  args: {
    isShow: true,
  },
};
