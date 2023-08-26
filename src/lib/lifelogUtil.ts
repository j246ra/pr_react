import { Lifelog } from '@providers/LifelogProvider';
import dayjs from 'dayjs';

const blank = (): Lifelog => {
  return {
    id: -1,
    userId: -1,
    action: '',
    detail: undefined,
    startedAt: '',
    finishedAt: undefined,
    createdAt: '',
    updatedAt: '',
  };
};

const sort = (logs: Lifelog[]) => {
  return logs.sort((a, b) => {
    return dayjs(b.startedAt).diff(dayjs(a.startedAt));
  });
};

const lifelogUtil = () => {
  return { blank, sort };
};

export default lifelogUtil;
