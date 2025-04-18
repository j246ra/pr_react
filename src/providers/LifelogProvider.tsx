import React, { createContext, ReactNode, useContext, useState } from 'react';
import { useUser } from '@providers/UserProvider';
import { AxiosError, AxiosResponse } from 'axios';
import lifelog, { CreatParams, UpdateParams } from '@lib/api/lifelog';
import {
  blank as newLifelog,
  buildCreateParamsByContext,
  sort as sortLog,
  add,
} from '@lib/lifelogUtil';
import { days, DATETIME_FULL } from '@lib/dateUtil';
import LifelogEditDialogProvider from '@providers/LifelogEditDialogProvider';
import LifelogDetailDialogProvider from '@providers/LifelogDetailDialogProvider';
import {
  BaseLifelog,
  validateLifelogResponse,
  convertResponseData,
} from '@lib/api/lifelogResponse';
import * as Sentry from '@sentry/react';
import notify from '@lib/toast';
import { COMMON, CONST } from '@lib/consts/common';
import { InvalidTokenError } from '@src/errors/InvalidTokenError';
import { useErrorBoundary } from 'react-error-boundary';

export type Lifelog = BaseLifelog & {
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
  const addLifelogs = (logs: Lifelog[]) => setLifelogs(add(lifelogs, logs));

  const [searchWord, setSearchWord] = useState('');
  const [page, setPage] = useState(0);
  const [isTerminated, setIsTerminated] = useState(false);
  const { user, getHeaders, clearUser, sessionIdIsBlank } = useUser();

  const { showBoundary } = useErrorBoundary();

  const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
    const h = response.headers;
    if (!sessionIdIsBlank() && user.sessionId !== h['session-id']) {
      clear();
      throw new InvalidTokenError(CONST.COMMON.MESSAGE.ERROR.SESSION_CONFLICT);
    }
    return response;
  };

  const errorInterceptorBuilder = (defaultErrorMessage?: string) => {
    return (error: AxiosError) => {
      switch (error.response?.status) {
        case 401:
          clearUser();
          if (error.response?.data === 'Invalid session_id')
            throw new InvalidTokenError(
              CONST.COMMON.MESSAGE.ERROR.SESSION_CONFLICT
            );
          else throw new InvalidTokenError(CONST.COMMON.MESSAGE.ERROR.EXPIRED);
        case 500:
        case 501:
        case 502:
        case 503:
          notify.error(COMMON.MESSAGE.ERROR.STATUS_5XX);
          break;
        default:
          notify.error(defaultErrorMessage || COMMON.MESSAGE.ERROR.GENERAL);
      }
      Sentry.addBreadcrumb({
        message: 'lifelogs api request error.',
        data: error,
      });
      return Promise.reject(error);
    };
  };

  const errorDispatch = (e: unknown) => {
    if (e instanceof InvalidTokenError) showBoundary(e);
    return Promise.reject(e);
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
    const r = await api(defaultErrorMessage)
      .index(nextPage, searchWord)
      .catch((e) => errorDispatch(e));
    setIsTerminated(r.data?.length === 0);
    const res = validateLifelogResponse(r.data);
    if (res.validData.length > 0) {
      addLifelogs(convertResponseData(res.validData));
      setPage(nextPage);
    }
    r.data = res;
    return r;
  };

  const searchLogs = async (word: string, defaultErrorMessage?: string) => {
    setSearchWord(word);
    const r = await api(defaultErrorMessage)
      .index(1, word)
      .catch((e) => errorDispatch(e));
    setIsTerminated(r.data?.length === 0);
    const res = validateLifelogResponse(r.data);
    setLifelogs(convertResponseData(res.validData));
    setPage(1);
    return r;
  };

  const newLog = newLifelog;

  const createLog = async (
    params: CreatParams,
    defaultErrorMessage?: string
  ) => {
    const r = await api(defaultErrorMessage)
      .create(params)
      .catch((e) => errorDispatch(e));
    const res = validateLifelogResponse(r.data);
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
    const r = await api(defaultErrorMessage)
      .update(params)
      .catch((e) => errorDispatch(e));
    const updatedLogs = [...lifelogs];
    const res = validateLifelogResponse(r.data);
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
    const r = await api(defaultErrorMessage)
      .destroy(id)
      .catch((e) => errorDispatch(e));
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
