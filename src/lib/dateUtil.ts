import dayjs from 'dayjs';
import { DATE_UTIL as CONST } from './consts/common';

export const DATETIME_FULL = CONST.FORMAT.DATETIME_FULL;
export const DISPLAY_DATETIME = CONST.FORMAT.DISPLAY_DATETIME;
export const DISPLAY_DATETIME_FULL = CONST.FORMAT.DISPLAY_DATETIME_FULL;

export const days = dayjs;

export const expires = () => dayjs().add(1, 'weeks').toDate();
