import React, { createContext, ReactNode, useContext, useState } from 'react';
import { useSession } from '@providers/SessionProvider';
import { useUser } from '@providers/UserProvider';
import { AxiosError, AxiosResponse } from 'axios';
import lifelog, { CreatParams, UpdateParams } from '@lib/api/lifelog';
import { blank as newLifelog, sort as sortLog } from '@lib/lifelogUtil';
import { days, DATETIME_FULL } from '@lib/dateUtil';
import LifelogEditDialogProvider from '@providers/LifelogEditDialogProvider';
import LifelogDetailDialogProvider from '@providers/LifelogDetailDialogProvider';
import {
  convertResponseData,
  validateResponseData,
} from '@lib/api/lifelogResponse';

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
  loadLogs: () => Promise<AxiosResponse>;
  searchLogs: (word: string) => Promise<AxiosResponse>;
  newLog: () => Lifelog;
  createLog: (params: CreatParams) => Promise<AxiosResponse>;
  createLogByContext: (context: string) => Promise<AxiosResponse>;
  finishLog: (log: Lifelog) => Promise<AxiosResponse>;
  updateLog: (params: UpdateParams) => Promise<AxiosResponse>;
  deleteLog: (id: number) => Promise<AxiosResponse>;
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
  const { getHeaders, setHeaders } = useSession();
  const { clearUser } = useUser();

  const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
    setHeaders(response);
    return response;
  };
  const errorInterceptor = (error: AxiosError): Promise<never> => {
    if (error.response?.status === 401) clearUser();
    return Promise.reject(error);
  };
  const api = lifelog(getHeaders, responseInterceptor, errorInterceptor);

  const loadLogs = async () => {
    const nextPage = page + 1;
    const r = await api.index(nextPage, searchWord);
    const res = validateResponseData(r.data);
    if (res.validData.length > 0) {
      addLifelogs(convertResponseData(res.validData));
      setPage(nextPage);
    }
    r.data = res;
    return r;
  };

  const searchLogs = async (word: string) => {
    setSearchWord(word);
    const r = await api.index(1, word);
    const res = validateResponseData(r.data);
    setLifelogs(convertResponseData(res.validData));
    setPage(1);
    return r;
  };

  const newLog = newLifelog;

  const createLog = async (params: CreatParams) => {
    const r = await api.create(params);
    const res = validateResponseData(r.data);
    addLifelogs(convertResponseData(res.validData));
    return r;
  };

  const createLogByContext = (context: string) => {
    const params: CreatParams = {
      action: context,
      detail: null,
      startedAt: days().format(DATETIME_FULL),
    };

    // 正規表現で全角半角の空白を検出
    const regex = /[\s\u3000]/;
    const index = context.search(regex);
    if (index !== -1) {
      params.action = context.slice(0, index);
      params.detail = context.slice(index + 1) || null;
    }
    return createLog(params);
  };

  const updateLog = async (params: UpdateParams) => {
    const r = await api.update(params);
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

  const finishLog = (log: Lifelog) => {
    const params: UpdateParams = { ...log };
    params.finishedAt = days().format(DATETIME_FULL);
    return updateLog(params);
  };

  const deleteLog = async (id: number) => {
    const r = await api.destroy(id);
    setLifelogs(lifelogs.filter((log) => log.id !== id));
    return r;
  };

  const clear = () => {
    setLifelogs([]);
    setPage(0);
    setSearchWord('');
  };

  return (
    <LifelogContext.Provider
      value={{
        lifelogs,
        loadLogs,
        searchLogs,
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
