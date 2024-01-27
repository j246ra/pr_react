import { Lifelog } from '@providers/LifelogProvider';
import { days } from '@lib/dateUtil';

export const blank = (): Lifelog => {
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

export const sort = (logs: Lifelog[]) => {
  return logs.sort((a, b) => {
    return days(b.startedAt).diff(days(a.startedAt));
  });
};

export const lifelogUtil = { blank, sort };

export default lifelogUtil;
