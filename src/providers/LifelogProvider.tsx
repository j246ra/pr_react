import React, { createContext, ReactNode, useContext, useState } from 'react';
import { useSession } from '@providers/SessionProvider';
import { useUser } from '@providers/UserProvider';
import { AxiosError, AxiosResponse } from 'axios';
import lifelog, { UpdateParams } from '@lib/api/lifelog';
import dayjs from 'dayjs';

export type Lifelog = {
  id: number;
  user_id: number;
  action: string;
  detail?: string;
  startedAt: string;
  finishedAt?: string;
  createdAt: string;
  updatedAt: string;
};

type LifelogContextType = {
  logs: Lifelog[];
  loadLogs: (page: number) => Promise<AxiosResponse>;
  newLog: () => Lifelog;
  createLogByContext: (context: string) => Promise<AxiosResponse>;
  updateLog: (params: UpdateParams) => Promise<AxiosResponse>;
  deleteLog: (id: number) => Promise<AxiosResponse>;
};

const LifelogContext = createContext<LifelogContextType | undefined>(undefined);

export const useLifelog = (): LifelogContextType => {
  const context = useContext(LifelogContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

type Props = {
  children: ReactNode;
};
export default function LifelogProvider({ children }: Props) {
  const [logs, setLogs] = useState<Lifelog[]>([]);
  const { headers, setToken } = useSession();
  const { clearUser } = useUser();
  const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
    setToken(response);
    return response;
  };
  const errorInterceptor = (error: AxiosError): Promise<never> => {
    if (error?.status === 401) clearUser();
    return Promise.reject(error);
  };
  const api = lifelog(headers, responseInterceptor, errorInterceptor);

  const loadLogs = (page: number) => {
    return api.index(page).then((r) => {
      if (r.data.length > 0) appendLogs(r.data);
      return r;
    });
  };

  const appendLogs = (lifelogs: Lifelog[]) => {
    setLogs([...logs, ...lifelogs]);
  };

  const sortLog = (lifelogs: Lifelog[]) => {
    return lifelogs.sort((a, b) => {
      return dayjs(b.startedAt).diff(dayjs(a.startedAt));
    });
  };

  const newLog = (): Lifelog => {
    return {
      id: -1,
      user_id: -1,
      action: '',
      detail: undefined,
      startedAt: '',
      finishedAt: undefined,
      createdAt: '',
      updatedAt: '',
    };
  };

  const createLogByContext = (context: string) => {
    return api.create({ context: context }).then((r) => {
      setLogs(sortLog([r.data, ...logs]));
      return r;
    });
  };

  const updateLog = (params: UpdateParams) => {
    return api.update(params).then((r) => {
      const i = logs.findIndex((log) => {
        return log.id === r.data.id;
      });
      if (i >= 0) {
        logs[i] = r.data;
        setLogs(sortLog(logs));
      } else {
        setLogs(sortLog([r.data, ...logs]));
      }
      return r;
    });
  };

  const deleteLog = (id: number) => {
    return api.destroy(id).then((r) => {
      setLogs(
        logs.filter((log) => {
          if (log.id !== id) return log;
        })
      );
      return r;
    });
  };

  return (
    <LifelogContext.Provider
      value={{
        logs,
        loadLogs,
        newLog,
        createLogByContext,
        updateLog,
        deleteLog,
      }}
    >
      {children}
    </LifelogContext.Provider>
  );
}
