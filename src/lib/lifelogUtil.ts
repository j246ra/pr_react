import { BaseLifelog, Lifelog } from '@providers/LifelogProvider';
import { days } from '@lib/dateUtil';
import * as Sentry from '@sentry/react';

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

type DataWithErrors = {
  data: any;
  errors: string[];
};

export const validateResponseData = (
  data: any
): { validData: BaseLifelog[]; invalidData: DataWithErrors[] } => {
  const validData: BaseLifelog[] = [];
  const invalidData: DataWithErrors[] = [];

  if (!data) return { validData, invalidData };
  const items = Array.isArray(data) ? data : [data];

  for (const item of items) {
    const errors: string[] = [];

    if (typeof item.id !== 'number') errors.push(`Invalid id [${item.id}]`);
    if (typeof item.userId !== 'number')
      errors.push(`Invalid userId [${item.userId}]`);
    if (typeof item.action !== 'string')
      errors.push(`Invalid action [${item.action}]`);
    if (item.detail && typeof item.detail !== 'string')
      errors.push(`Invalid detail [${item.detail}]`);
    if (typeof item.startedAt !== 'string')
      errors.push(`Invalid startedAt [${item.startedAt}]`);
    if (item.finishedAt && typeof item.finishedAt !== 'string')
      errors.push(`Invalid finishedAt [${item.finishedAt}]`);
    if (typeof item.createdAt !== 'string')
      errors.push(`Invalid createdAt [${item.createdAt}]`);
    if (typeof item.updatedAt !== 'string')
      errors.push(`Invalid updatedAt [${item.updatedAt}]`);

    if (errors.length > 0) invalidData.push({ data: item, errors });
    else validData.push(item);
  }

  if (invalidData.length > 0) {
    Sentry.addBreadcrumb({
      message: 'lifelogs api invalidData',
      data: invalidData,
    });
  }

  return { validData, invalidData };
};

export const convertResponseData = (data: BaseLifelog[]): Lifelog[] => {
  return data.map((log) => {
    return { ...blank(), ...log };
  });
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
  validateResponseData,
  convertResponseData,
};

export default lifelogUtil;
