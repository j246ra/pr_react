import { createContext, ReactNode, useContext, useState } from 'react';

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
  addLogs: (lifelogs: Lifelog[]) => void;
  deleteLog: (id: number) => void;
};

const LifelogContext = createContext<LifelogContextType | undefined>(undefined);

export const useLifelogs = (): LifelogContextType => {
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
  const addLogs = (lifelogs: Lifelog[]) => {
    setLogs([...logs, ...lifelogs]);
  };

  const deleteLog = (id: number) => {
    setLogs(
      logs.filter((log) => {
        if (log.id !== id) return log;
      })
    );
  };
  return (
    <LifelogContext.Provider value={{ logs, addLogs, deleteLog }}>
      {children}
    </LifelogContext.Provider>
  );
}
