import { FallbackProps } from 'react-error-boundary';
import ReloadRequiredDialog from '@src/components/ReloadRequiredDialog';

export function AppErrorFallback({ error }: FallbackProps) {
  return <ReloadRequiredDialog message={error.message} />;
}
