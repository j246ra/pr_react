import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { DATE_UTIL as CONST } from './consts/common';
import { DATETIME_INPUT } from '@lib/consts/component';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault(DATETIME_INPUT.TIMEZONE);

export const DATETIME_FULL = CONST.FORMAT.DATETIME_FULL;
export const DISPLAY_DATETIME = CONST.FORMAT.DISPLAY_DATETIME;
export const DISPLAY_DATETIME_FULL = CONST.FORMAT.DISPLAY_DATETIME_FULL;

export const days = dayjs;

export const expires = () => dayjs().add(1, 'weeks').toDate();
