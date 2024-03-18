import React, { createContext, ReactNode, useContext, useState } from 'react';
import { useSession } from '@providers/SessionProvider';
import { useUser } from '@providers/UserProvider';
import { AxiosError, AxiosResponse } from 'axios';
import lifelog, { CreatParams, UpdateParams } from '@lib/api/lifelog';
import {
  blank as newLifelog,
  buildCreateParamsByContext,
  sort as sortLog,
} from '@lib/lifelogUtil';
import { days, DATETIME_FULL } from '@lib/dateUtil';
import LifelogEditDialogProvider from '@providers/LifelogEditDialogProvider';
import LifelogDetailDialogProvider from '@providers/LifelogDetailDialogProvider';
import {
  convertResponseData,
  validateResponseData,
} from '@lib/api/lifelogResponse';
import * as Sentry from '@sentry/react';
import notify from '@lib/toast';
import { COMMON } from '@lib/consts/common';

export type BaseLifelog = {
  id: number;
  userId: number;
  action: string;
  detail?: string | null;
  startedAt: string;
  finishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Lifelog = Omit<BaseLifelog, 'detail' | 'finishedAt'> & {
  detail: string | null;
  finishedAt: string | null;
  isDateChanged: boolean;
};

export type LifelogContextType = {
  lifelogs: Lifelog[];
  loadLogs: (defaultErrorMessage?: string) => Promise<AxiosResponse>;
  searchLogs: (
    word: string,
    defaultErrorMessage?: string
  ) => Promise<AxiosResponse>;
  searchWord: string;
  isTerminated: boolean;
  newLog: () => Lifelog;
  createLog: (
    params: CreatParams,
    defaultErrorMessage?: string
  ) => Promise<AxiosResponse>;
  createLogByContext: (
    context: string,
    defaultErrorMessage?: string
  ) => Promise<AxiosResponse>;
  finishLog: (
    log: Lifelog,
    defaultErrorMessage?: string
  ) => Promise<AxiosResponse>;
  updateLog: (
    params: UpdateParams,
    defaultErrorMessage?: string
  ) => Promise<AxiosResponse>;
  deleteLog: (
    id: number,
    defaultErrorMessage?: string
  ) => Promise<AxiosResponse>;
  clear: () => void;
};

const LifelogContext = createContext({} as LifelogContextType);
export const useLifelog = () => useContext(LifelogContext);

export type LifelogProviderProps = {
  children: ReactNode;
};

export default function LifelogProvider({ children }: LifelogProviderProps) {
  const [lifelogs, _setLifelogs] = useState<Lifelog[]>([]);
  const setLifelogs = (logs: Lifelog[]) => {
    _setLifelogs(sortLog(logs));
  };
  const addLifelogs = (logs: Lifelog[]) => setLifelogs([...lifelogs, ...logs]);

  const [searchWord, setSearchWord] = useState('');
  const [page, setPage] = useState(0);
  const [isTerminated, setIsTerminated] = useState(false);
  const { getHeaders, setHeaders } = useSession();
  const { clearUser } = useUser();

  const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
    setHeaders(response);
    return response;
  };

  const errorInterceptorBuilder = (defaultErrorMessage?: string) => {
    return (error: AxiosError) => {
      const status = error.response?.status;
      if (status) {
        switch (error.response?.status) {
          case 401:
            clearUser();
            notify.error(COMMON.MESSAGE.ERROR.EXPIRED);
            break;
          case 500:
          case 501:
          case 502:
          case 503:
            notify.error(COMMON.MESSAGE.ERROR.STATUS_5XX);
            break;
          default:
            notify.error(defaultErrorMessage || COMMON.MESSAGE.ERROR.GENERAL);
        }
      }
      Sentry.addBreadcrumb({
        message: 'lifelogs api request error.',
        data: error,
      });
      return Promise.reject(error);
    };
  };

  const api = (defaultErrorMessage?: string) => {
    return lifelog(
      getHeaders,
      responseInterceptor,
      errorInterceptorBuilder(defaultErrorMessage)
    );
  };

  const loadLogs = async (defaultErrorMessage?: string) => {
    const nextPage = page + 1;
    const r = await api(defaultErrorMessage).index(nextPage, searchWord);
    setIsTerminated(r.data?.length === 0);
    const res = validateResponseData(r.data);
    if (res.validData.length > 0) {
      addLifelogs(convertResponseData(res.validData));
      setPage(nextPage);
    }
    r.data = res;
    return r;
  };

  const searchLogs = async (word: string, defaultErrorMessage?: string) => {
    setSearchWord(word);
    const r = await api(defaultErrorMessage).index(1, word);
    setIsTerminated(r.data?.length === 0);
    const res = validateResponseData(r.data);
    setLifelogs(convertResponseData(res.validData));
    setPage(1);
    return r;
  };

  const newLog = newLifelog;

  const createLog = async (
    params: CreatParams,
    defaultErrorMessage?: string
  ) => {
    const r = await api(defaultErrorMessage).create(params);
    const res = validateResponseData(r.data);
    addLifelogs(convertResponseData(res.validData));
    return r;
  };

  const createLogByContext = (
    context: string,
    defaultErrorMessage?: string
  ) => {
    return createLog(buildCreateParamsByContext(context), defaultErrorMessage);
  };

  const updateLog = async (
    params: UpdateParams,
    defaultErrorMessage?: string
  ) => {
    const r = await api(defaultErrorMessage).update(params);
    const updatedLogs = [...lifelogs];
    const res = validateResponseData(r.data);
    const _log = convertResponseData(res.validData)[0];
    const i = updatedLogs.findIndex((log) => log.id === _log.id);
    if (i >= 0) {
      updatedLogs[i] = _log;
    } else updatedLogs.unshift(_log);
    setLifelogs(updatedLogs);
    return r;
  };

  const finishLog = (log: Lifelog, defaultErrorMessage?: string) => {
    const params: UpdateParams = { ...log };
    params.finishedAt = days().format(DATETIME_FULL);
    return updateLog(params, defaultErrorMessage);
  };

  const deleteLog = async (id: number, defaultErrorMessage?: string) => {
    const r = await api(defaultErrorMessage).destroy(id);
    setLifelogs(lifelogs.filter((log) => log.id !== id));
    return r;
  };

  const clear = () => {
    _setLifelogs([]);
    setIsTerminated(false);
    setPage(0);
    setSearchWord('');
  };

  return (
    <LifelogContext.Provider
      value={{
        lifelogs,
        loadLogs,
        searchLogs,
        searchWord,
        isTerminated,
        newLog,
        createLog,
        createLogByContext,
        finishLog,
        updateLog,
        deleteLog,
        clear,
      }}
    >
      <LifelogDetailDialogProvider>
        <LifelogEditDialogProvider>{children}</LifelogEditDialogProvider>
      </LifelogDetailDialogProvider>
    </LifelogContext.Provider>
  );
}
