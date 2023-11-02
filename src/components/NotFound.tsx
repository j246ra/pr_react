import React from 'react';
import { H3 } from '@blueprintjs/core';
import { NOTFOUND } from '@lib/consts/component';

const NotFound = () => {
  return (
    <H3
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
      }}
    >
      {NOTFOUND.CONTEXT}
    </H3>
  );
};

export default NotFound;
