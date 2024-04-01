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

const convertConfigToObject = (
  config: ConfigValue
): {
  expectedType: ConfigValueType;
  isNullable: boolean;
} => {
  const [expectedType, isNullable] = config;
  return { expectedType, isNullable };
};

export const buildTypeGuard = <T>(
  typeCheckConfigurations: Record<string, ConfigValue>
): ((data?: unknown) => { validData: T[]; invalidData: DataWithErrors[] }) => {
  return (data?: unknown) => {
    const validData: T[] = [];
    const invalidData: DataWithErrors[] = [];
    if (!data) return { validData, invalidData };
    const items = Array.isArray(data) ? data : [data];
    for (const item of items) {
      const errors: string[] = [];
      Object.entries(typeCheckConfigurations).forEach(([key, config]) => {
        const { expectedType, isNullable } = convertConfigToObject(config);
        const value = (item as any)[key];
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
