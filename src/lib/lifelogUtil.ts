import { Lifelog } from '@providers/LifelogProvider';
import dayjs from 'dayjs';

const sort = (logs: Lifelog[]) => {
  return logs.sort((a, b) => {
    return dayjs(b.startedAt).diff(dayjs(a.startedAt));
  });
};

const lifelogUtil = () => {
  return { sort };
};

export default lifelogUtil;
