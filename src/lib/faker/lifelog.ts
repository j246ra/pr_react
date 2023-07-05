import { Lifelog } from '@providers/LifelogProvider';
import { fakerJA } from '@faker-js/faker';
import { DATETIME_FULL, now } from '@lib/dateUtil';

export const lifelog = (): Lifelog => {
  return {
    id: 1,
    user_id: 1,
    action: fakerJA.lorem.word(),
    detail: fakerJA.lorem.paragraph({ min: 2, max: 8 }),
    startedAt: now.subtract(30, 'm').format(DATETIME_FULL),
    finishedAt: now.format(DATETIME_FULL),
    createdAt: now.format(DATETIME_FULL),
    updatedAt: now.format(DATETIME_FULL),
  };
};
