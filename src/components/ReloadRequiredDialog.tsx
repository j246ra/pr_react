import React from 'react';
import { Alert, Intent } from '@blueprintjs/core';

export default function ReloadRequiredDialog({ message }: { message: string }) {
  return (
    <Alert
      isOpen={true}
      confirmButtonText="リロード"
      intent={Intent.DANGER}
      icon="error"
      onConfirm={() => window.location.reload()}
    >
      <p>{message}</p>
    </Alert>
  );
}
