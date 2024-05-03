import React from 'react';
import { AUTHENTICATED_ONLY } from '@lib/consts/component';
import AuthGate, { AuthGateProps } from '@src/components/AuthGate';

/**
 * AuthenticatedOnlyProps
 *
 * @property children 認証済みの場合に表示するコンポーネント
 * @property [fallbackPath] 未認証の場合のリダイレクト先、未指定の場合は AUTHENTICATED_ONLY.FALLBACK_PATH
 * @property [fallbackMessage] 未認証の場合に表示するエラーメッセージ
 */
export type AuthenticatedOnlyProps = Pick<
  AuthGateProps,
  'children' | 'fallbackMessage'
> &
  Partial<Pick<AuthGateProps, 'fallbackPath'>>;

function AuthenticatedOnly({
  children,
  fallbackPath = AUTHENTICATED_ONLY.FALLBACK_PATH,
}: AuthenticatedOnlyProps) {
  return (
    <AuthGate
      children={children}
      passingCondition={(isLoggedIn) => isLoggedIn}
      fallbackPath={fallbackPath}
      fallbackMessage={AUTHENTICATED_ONLY.MESSAGE.ERROR}
    />
  );
}

export default AuthenticatedOnly;
