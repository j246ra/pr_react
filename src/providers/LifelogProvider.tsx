import React, {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  useState,
} from 'react';
import { useSession } from '@providers/SessionProvider';
import { useUser } from '@providers/UserProvider';
import { AxiosError, AxiosResponse } from 'axios';
import lifelog, { CreatParams, UpdateParams } from '@lib/api/lifelog';
import { blank as newLifelog, sort as sortLog } from '@lib/lifelogUtil';
import { days, DATETIME_FULL } from '@lib/dateUtil';
import LifelogEditDialogProvider from '@providers/LifelogEditDialogProvider';
import LifelogDetailDialogProvider from '@providers/LifelogDetailDialogProvider';

export type Lifelog = {
  id: number;
  userId: number;
  action: string;
  detail?: string;
  startedAt: string;
  finishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type LifelogContextType = {
  logs: Lifelog[];
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

type SetLogs = {
  type?: string;
  value: Lifelog[];
};

export default function LifelogProvider({ children }: LifelogProviderProps) {
  const [logs, setLogs] = useReducer((logs: Lifelog[], action: SetLogs) => {
    switch (action.type) {
      case 'append':
        return [...logs, ...action.value];
      case 'sort':
        return sortLog([...logs, ...action.value]);
      default:
        return action.value;
    }
  }, []);

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
    if (r.data.length > 0) {
      setLogs({ type: 'append', value: r.data });
      setPage(nextPage);
    }
    return r;
  };

  const searchLogs = async (word: string) => {
    setSearchWord(word);
    const r = await api.index(1, word);
    setLogs({ value: r.data });
    setPage(1);
    return r;
  };

  const newLog = newLifelog;

  const createLog = async (params: CreatParams) => {
    const r = await api.create(params);
    setLogs({ type: 'sort', value: [r.data] });
    return r;
  };

  const createLogByContext = (context: string) => {
    const params = {
      action: context,
      detail: '',
      startedAt: days().format(DATETIME_FULL),
    };

    // 正規表現で全角半角の空白を検出
    const regex = /[\s\u3000]/;
    const index = context.search(regex);
    if (index !== -1) {
      params.action = context.slice(0, index);
      params.detail = context.slice(index + 1);
    }
    return createLog(params);
  };

  const updateLog = async (params: UpdateParams) => {
    const r = await api.update(params);
    const updatedLogs = [...logs];
    const i = updatedLogs.findIndex((log) => log.id === r.data.id);
    if (i >= 0) updatedLogs[i] = r.data;
    else updatedLogs.unshift(r.data);
    setLogs({ value: updatedLogs });
    return r;
  };

  const finishLog = (log: Lifelog) => {
    const params: UpdateParams = { ...log };
    params.finishedAt = days().format(DATETIME_FULL);
    return updateLog(params);
  };

  const deleteLog = async (id: number) => {
    const r = await api.destroy(id);
    setLogs({ value: logs.filter((log) => log.id !== id) });
    return r;
  };

  const clear = () => {
    setLogs({ value: [] });
    setPage(0);
    setSearchWord('');
  };

  return (
    <LifelogContext.Provider
      value={{
        logs,
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
