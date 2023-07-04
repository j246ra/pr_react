import { Meta } from '@storybook/react';
import DatetimeInput from './DatetimeInput';

export default {
  title: 'components/Lifelog/DatetimeInput',
  component: DatetimeInput,
} as Meta;

export const Default = {
  args: {
    label: '開始時間',
    placeholder: '開始日時を入力',
    value: '2023-07-04 23:47:22',
  },
};
