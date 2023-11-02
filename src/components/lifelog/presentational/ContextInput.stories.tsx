import { Meta } from '@storybook/react';
import ContextInput from './ContextInput';

export default {
  title: 'Lifelog/Presentational/ContextInput',
  component: ContextInput,
} as Meta;

export const Default = {
  args: {
    value: '',
    onChange: () => {},
    onSubmit: () => {},
  },
};
