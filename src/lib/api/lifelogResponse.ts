import { BaseLifelog, Lifelog } from '@providers/LifelogProvider';
import * as Sentry from '@sentry/react';
import { blank } from '@lib/lifelogUtil';

type DataWithErrors = {
  data: any;
  errors: string[];
};

type ConfigValueType =
  | 'number'
  | 'string'
  | 'boolean'
  | 'null'
  | 'object'
  | 'array'
  | 'unknown';
type ConfigValue = [ConfigValueType, boolean];
const typeCheckConfigurations: Record<string, ConfigValue> = {
  id: ['number', false],
  userId: ['number', false],
  action: ['string', false],
  detail: ['string', true],
  startedAt: ['string', false],
  finishedAt: ['string', true],
  createdAt: ['string', false],
  updatedAt: ['string', false],
};

const convertConfigToObject = (config: ConfigValue) => {
  const [expectedType, isNullable] = config;
  return { expectedType, isNullable };
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

    Object.entries(typeCheckConfigurations).forEach(([key, config]) => {
      const { expectedType, isNullable } = convertConfigToObject(config);
      if ((item[key] || !isNullable) && typeof item[key] !== expectedType)
        errors.push(`Invalid ${key} [${item[key]}]`);
    });

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
