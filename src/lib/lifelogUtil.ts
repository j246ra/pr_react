import { Lifelog } from '@providers/LifelogProvider';
import { days } from '@lib/dateUtil';

export const blank = (): Lifelog => {
  return {
    id: -1,
    userId: -1,
    action: '',
    detail: null,
    startedAt: '',
    finishedAt: null,
    createdAt: '',
    updatedAt: '',
    isDateChanged: false,
  };
};

export const sort = (logs: Lifelog[]) => {
  const sortedLogs = logs.sort((a, b) =>
    days(b.startedAt).diff(days(a.startedAt))
  );

  let previousDate: string | null = null;
  for (const log of sortedLogs) {
    const logDate = days(log.startedAt).format('YYYY-MM-DD');
    log.isDateChanged = previousDate === null ? true : previousDate !== logDate;
    previousDate = logDate;
  }

  return sortedLogs;
};

export const lifelogUtil = {
  blank,
  sort,
};

export default lifelogUtil;
