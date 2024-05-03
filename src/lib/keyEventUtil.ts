import React from 'react';

export const doFunctionWhenCmdOrCtrlEnter = (
  e: React.KeyboardEvent,
  func: () => void
) => {
  if (
    !e.nativeEvent.isComposing &&
    (e.ctrlKey || e.metaKey) &&
    e.key === 'Enter'
  ) {
    func();
  }
};
