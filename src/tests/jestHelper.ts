import dayjs from 'dayjs';
import { days } from '@lib/dateUtil';

export const checkTimeWithinRange = (
  actual: string,
  baseTime: dayjs.Dayjs,
  rangeInMilliseconds = 3_000
) => {
  const dateActual = days(actual);
  expect(dateActual.unix()).toBeGreaterThanOrEqual(baseTime.unix());
  expect(dateActual.unix()).toBeLessThan(baseTime.unix() + rangeInMilliseconds);
};
