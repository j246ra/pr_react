import { Meta } from '@storybook/react';
import DatetimeInput from './DatetimeInput';

export default {
  title: 'components/Lifelog/DatetimeInput',
  component: DatetimeInput,
} as Meta;

export const Default = {
  args: {
    id: 'sb-datetime',
    label: '開始時間',
    placeholder: '開始日時を入力',
  },
};
