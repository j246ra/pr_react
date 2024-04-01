import * as Sentry from '@sentry/react';

export type DataWithErrors = {
  data: unknown;
  errors: string[];
};

export type ConfigValueType =
  | 'number'
  | 'string'
  | 'boolean'
  | 'null'
  | 'object'
  | 'array'
  | 'unknown';

export type ConfigValue = [ConfigValueType, boolean];

type ConfigObject = {
  key: string;
  expectedType: ConfigValueType;
  isNullable: boolean;
};

const convertConfigObject = (
  configValues: Record<string, ConfigValue>
): ConfigObject[] => {
  const configObjects: ConfigObject[] = [];
  for (const [key, config] of Object.entries(configValues)) {
    const [expectedType, isNullable] = config;
    configObjects.push({ key, expectedType, isNullable });
  }
  return configObjects;
};

export const buildTypeGuard = <T>(
  typeGuardConfigurations: Record<string, ConfigValue>
): ((data?: unknown) => { validData: T[]; invalidData: DataWithErrors[] }) => {
  return (data?: unknown) => {
    const validData: T[] = [];
    const invalidData: DataWithErrors[] = [];
    if (!data) return { validData, invalidData };

    const configObjects = convertConfigObject(typeGuardConfigurations);
    const items = Array.isArray(data) ? data : [data];
    for (const item of items) {
      const errors: string[] = [];
      configObjects.forEach((config) => {
        const { key, expectedType, isNullable } = config;
        const value = item[key];
        if ((value || !isNullable) && typeof value !== expectedType)
          errors.push(`Invalid ${key} [${value}]`);
      });
      if (errors.length > 0) invalidData.push({ data: item, errors });
      else validData.push(item as T);
    }

    if (invalidData.length > 0) {
      Sentry.addBreadcrumb({
        message: 'api invalidData',
        data: invalidData,
      });
    }

    return { validData, invalidData };
  };
};
