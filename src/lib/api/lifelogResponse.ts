import { BaseLifelog, Lifelog } from '@providers/LifelogProvider';
import * as Sentry from '@sentry/react';
import { blank } from '@lib/lifelogUtil';

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
