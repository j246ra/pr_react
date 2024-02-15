import { Lifelog } from '@providers/LifelogProvider';
import { fakerJA } from '@faker-js/faker';
import { days, DATETIME_FULL } from '@lib/dateUtil';

export type OptionalLifelog = Partial<Lifelog>;

export const lifelog = (log?: OptionalLifelog): Lifelog => {
  const now = days();
  return {
    id: log?.id || 1,
    userId: log?.userId || 1,
    action: log?.action || fakerJA.lorem.word(),
    detail:
      log?.detail === undefined
        ? fakerJA.lorem.paragraph({ min: 2, max: 8 })
        : log.detail,
    startedAt: log?.startedAt || now.subtract(30, 'm').format(DATETIME_FULL),
    finishedAt:
      log?.finishedAt === undefined
        ? now.format(DATETIME_FULL)
        : log.finishedAt,
    createdAt: log?.createdAt || now.format(DATETIME_FULL),
    updatedAt: log?.updatedAt || now.format(DATETIME_FULL),
    isDateChanged: log?.isDateChanged || false,
  };
};

export const lifelogs = (length = 1, offset = 0) => {
  const logs: Lifelog[] = [];
  for (let i = 0; i < length; i++) {
    const datetime = days().subtract(i, 'h').format(DATETIME_FULL);
    logs.push(
      lifelog({
        id: i + offset + 1,
        startedAt: datetime,
        finishedAt: null,
      })
    );
  }
  return logs;
};
