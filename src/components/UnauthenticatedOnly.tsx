import React from 'react';
import AuthGate, { AuthGateProps } from '@src/components/AuthGate';
import { UNAUTHENTICATED_ONLY } from '@lib/consts/component';

/**
 * UnauthenticatedOnlyProps
 *
 * @property children 未認証の場合に表示するコンポーネント
 * @property [fallbackPath] 認証済みの場合のリダイレクト先、未指定の場合は UNAUTHENTICATED_ONLY.FALLBACK_PATH
 * @property [fallbackMessage] 認証済みの場合に表示するエラーメッセージ
 */
export type UnauthenticatedOnlyProps = Pick<
  AuthGateProps,
  'children' | 'fallbackMessage'
> &
  Partial<Pick<AuthGateProps, 'fallbackPath'>>;

function UnauthenticatedOnly({
  children,
  fallbackPath = UNAUTHENTICATED_ONLY.FALLBACK_PATH,
  fallbackMessage,
}: UnauthenticatedOnlyProps) {
  return (
    <AuthGate
      children={children}
      passingCondition={(isLoggedIn) => !isLoggedIn}
      fallbackPath={fallbackPath}
      fallbackMessage={fallbackMessage}
    />
  );
}

export default UnauthenticatedOnly;
