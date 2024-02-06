import React from 'react';
import LifelogList from '@lifelog/container/LifelogList';
import LifelogDetailDialog from '@lifelog/container/LifelogDetailDialog';
import LifelogEditDialog from '@lifelog/container/LifelogEditDialog';
import ContextInput from '@lifelog/container/ContextInput';

export default function Lifelogs() {
  return (
    <>
      <LifelogDetailDialog />
      <LifelogEditDialog />
      <ContextInput />
      <LifelogList />
    </>
  );
}
