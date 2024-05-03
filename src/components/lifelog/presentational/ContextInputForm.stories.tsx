import { Meta } from '@storybook/react';
import ContextInputForm from './ContextInputForm';

export default {
  title: 'Lifelog/Presentational/ContextInput',
  component: ContextInputForm,
} as Meta;

export const Default = {
  args: {
    value: '',
    onChange: () => {},
    onSubmit: () => {},
  },
};
