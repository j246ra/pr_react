import dayjs from 'dayjs';
import { DATE_UTIL as CONST } from './consts/common';

export const DATETIME_FULL = CONST.FORMAT.DATETIME_FULL;
export const DISPLAY_TIME = CONST.FORMAT.DISPLAY_TIME;
export const DISPLAY_TIME_FULL = CONST.FORMAT.DISPLAY_TIME_FULL;

export const DISPLAY_DATE = CONST.FORMAT.DISPLAY_DATE;
export const DISPLAY_DATETIME = CONST.FORMAT.DISPLAY_DATETIME;
export const DISPLAY_DATETIME_FULL = CONST.FORMAT.DISPLAY_DATETIME_FULL;

export const MAX_ACTION_MINUTES = CONST.MAX_ACTION_MINUTES;

export const days = dayjs;

export const daysDisplay = (datetime?: string | null) =>
  datetime ? dayjs(datetime).format(DISPLAY_DATETIME) : '';

export const daysDisplayFull = (datetime?: string | null) =>
  datetime ? dayjs(datetime).format(DISPLAY_DATETIME_FULL) : '';
