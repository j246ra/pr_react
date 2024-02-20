import React, { FormEvent, useState } from 'react';
import { useLifelog } from '@providers/LifelogProvider';
import notify from '@lib/toast';
import { LIFELOGS } from '@lib/consts/component';
import ContextInputForm from '@lifelog/presentational/ContextInputForm';

export default function ContextInput() {
  const { createLogByContext } = useLifelog();
  const [context, setContext] = useState<string>('');

  const handleCreateLifelog = (e: FormEvent) => {
    e.preventDefault();
    createLogByContext(context).then(() => {
      setContext('');
      notify.success(LIFELOGS.MESSAGE.SUCCESS);
    });
  };

  return (
    <ContextInputForm
      onSubmit={handleCreateLifelog}
      value={context}
      onChange={(e) => setContext(e.target.value)}
    />
  );
}
