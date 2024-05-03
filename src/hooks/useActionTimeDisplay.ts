import { Lifelog } from '@providers/LifelogProvider';
import { useMemo } from 'react';
import {
  days,
  DISPLAY_DATE,
  DISPLAY_DATETIME,
  DISPLAY_TIME,
  MAX_ACTION_MINUTES,
} from '@lib/dateUtil';

const useActionTimeDisplay = (lifelog: Lifelog) => {
  const startedDays = useMemo(
    () => days(lifelog.startedAt),
    [lifelog.startedAt]
  );
  const startedDatetime = useMemo(
    () => startedDays.format(DISPLAY_DATETIME),
    [startedDays]
  );
  const startedDate = useMemo(
    () => startedDays.format(DISPLAY_DATE),
    [startedDays]
  );
  const startedTime = useMemo(
    () => startedDays.format(DISPLAY_TIME),
    [startedDays]
  );
  const actionTime = useMemo(() => {
    if (!lifelog.finishedAt) return null;
    return days(lifelog.finishedAt).diff(startedDays, 'minutes');
  }, [lifelog.finishedAt, startedDays]);

  const displayDatetime = useMemo(
    () => (lifelog.isDateChanged ? startedDatetime : startedTime),
    [lifelog.isDateChanged, startedDatetime, startedTime]
  );

  const displayActionTime = useMemo(() => {
    if (!actionTime) return '';
    const actionMinutes =
      actionTime > MAX_ACTION_MINUTES
        ? `${MAX_ACTION_MINUTES}+`
        : `${actionTime}`;
    return ` (${actionMinutes})`;
  }, [actionTime]);

  return {
    startedDate,
    startedTime,
    startedDatetime,
    actionTime,
    displayDatetime,
    displayActionTime,
  };
};

export default useActionTimeDisplay;
