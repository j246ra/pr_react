import { Meta } from '@storybook/react';
import ContextInput from './ContextInput';

export default {
  title: 'Components/Lifelog/ContextInput',
  component: ContextInput,
} as Meta;

export const Default = {
  args: {
    value: '',
    onChange: () => {},
    onSubmit: () => {},
  },
};
