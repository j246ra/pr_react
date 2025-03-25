import { Lifelog } from '@providers/LifelogProvider';
import { DATETIME_FULL, days } from '@lib/dateUtil';

export const blank = (): Lifelog => {
  return {
    id: -1,
    userId: -1,
    action: '',
    detail: null,
    startedAt: '',
    finishedAt: null,
    createdAt: '',
    updatedAt: '',
    isDateChanged: false,
  };
};

export const add = (logs: Lifelog[], addLogs: Lifelog[]) => {
  for (const addLog of addLogs) {
    const index = logs.findIndex((log) => log.id === addLog.id);
    if (index >= 0) logs[index] = addLog;
    else logs.unshift(addLog);
  }
  return logs;
};

export const sort = (logs: Lifelog[]) => {
  const sortedLogs = [...logs].sort((a, b) =>
    days(b.startedAt).diff(days(a.startedAt))
  );

  let previousDate: string | null = null;
  for (const log of sortedLogs) {
    const logDate = days(log.startedAt).format('YYYY-MM-DD');
    log.isDateChanged = previousDate === null ? true : previousDate !== logDate;
    previousDate = logDate;
  }

  return sortedLogs;
};

export const buildCreateParamsByContext = (context: string) => {
  let startedAt: string | null = null;

  // 入力が時間（HHmm形式）で始まるかどうかを確認する正規表現
  const timeRegEx = /^(0[0-9]|1[0-9]|2[0-3])[0-5][0-9]\b/;
  const result = context.match(timeRegEx);

  // 入力が時間で始まる場合、それを開始時刻として扱う
  if (result) {
    const time = result[0];
    const today = days().format('YYYY-MM-DD');
    startedAt = days(today)
      .hour(Number(time.slice(0, 2)))
      .minute(Number(time.slice(2, 4)))
      .format(DATETIME_FULL);
    // 入力から時間部分を削除
    context = context.replace(timeRegEx, '').trim();
  }

  // 正規表現で全角半角の空白を検出
  const regex = /[\s\u3000]/;
  const index = context.search(regex);
  let action = context;
  let detail = null;
  if (index !== -1) {
    action = context.slice(0, index);
    detail = context.slice(index + 1) || null;
  }

  return {
    action: action,
    detail: detail,
    startedAt: startedAt || days().format(DATETIME_FULL),
    finishedAt: null,
  };
};

export const lifelogUtil = {
  blank,
  add,
  sort,
  buildCreateParamsByContext,
};

export default lifelogUtil;
