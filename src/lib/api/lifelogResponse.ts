import { Lifelog } from '@providers/LifelogProvider';
import { blank } from '@lib/lifelogUtil';
import { z, ZodFormattedError } from 'zod';
import * as Sentry from '@sentry/react';

const LifelogSchema = z.object({
  id: z.number(),
  userId: z.number(),
  action: z.string(),
  detail: z.string().nullable(),
  startedAt: z.string(),
  finishedAt: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type BaseLifelog = z.infer<typeof LifelogSchema>;

type ResponseErrors<T> = {
  data: unknown;
  errors: ZodFormattedError<T>;
};

export function validateLifelogResponse(data: unknown) {
  const validData: BaseLifelog[] = [];
  const invalidData: ResponseErrors<BaseLifelog>[] = [];
  if (!data) return { validData, invalidData };

  const items = Array.isArray(data) ? data : [data];
  for (const item of items) {
    const result = LifelogSchema.safeParse(item);
    if (result.success) {
      validData.push(item);
    } else {
      invalidData.push({ data: item, errors: result.error.format() });
    }
  }

  if (invalidData.length > 0) {
    Sentry.addBreadcrumb({
      message: 'api invalidData',
      data: invalidData,
    });
  }

  return { validData, invalidData };
}

export const convertResponseData = (data: BaseLifelog[]): Lifelog[] => {
  return data.map((log) => {
    return { ...blank(), ...log };
  });
};
