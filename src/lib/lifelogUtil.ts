import { Lifelog } from '@providers/LifelogProvider';
import { DATETIME_FULL, days } from '@lib/dateUtil';
import { CreatParams } from '@lib/api/lifelog';

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

export const buildCreateParamsByContext = (context: string) => {
  const params: Required<CreatParams> = {
    action: context,
    detail: null,
    startedAt: days().format(DATETIME_FULL),
    finishedAt: null,
  };
  // 正規表現で全角半角の空白を検出
  const regex = /[\s\u3000]/;
  const index = context.search(regex);
  if (index !== -1) {
    params.action = context.slice(0, index);
    params.detail = context.slice(index + 1) || null;
  }
  return params;
};

export const lifelogUtil = {
  blank,
  sort,
  buildCreateParamsByContext,
};

export default lifelogUtil;
