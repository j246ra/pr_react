import { Alert, Intent } from '@blueprintjs/core';
import { FallbackProps } from 'react-error-boundary';

export function ErrorAlert({ error }: FallbackProps) {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <Alert
      isOpen={true}
      confirmButtonText="リロード"
      intent={Intent.DANGER}
      icon="error"
      onConfirm={handleReload}
    >
      <p>{error.message}</p>
    </Alert>
  );
}
