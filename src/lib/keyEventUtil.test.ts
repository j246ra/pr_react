import React from 'react';
import { doFunctionWhenCmdOrCtrlEnter } from './keyEventUtil';

describe('doFunctionWhenCmdOrCtrlEnter', () => {
  it('e.nativeEvent.isComposingがtrueの場合、関数は呼び出されない', () => {
    const func = jest.fn();
    const event = {
      nativeEvent: { isComposing: true },
      ctrlKey: true,
      metaKey: false,
      key: 'Enter',
    } as React.KeyboardEvent;
    doFunctionWhenCmdOrCtrlEnter(event, func);
    expect(func).not.toHaveBeenCalled();
  });

  it('e.ctrlKeyとe.metaKeyがどちらもtrueでない場合、関数は呼び出されない', () => {
    const func = jest.fn();
    const event = {
      nativeEvent: { isComposing: false },
      ctrlKey: false,
      metaKey: false,
      key: 'Enter',
    } as React.KeyboardEvent;
    doFunctionWhenCmdOrCtrlEnter(event, func);
    expect(func).not.toHaveBeenCalled();
  });

  it('e.keyがEnterではない場合、関数は呼び出されない', () => {
    const func = jest.fn();
    const event = {
      nativeEvent: { isComposing: false },
      ctrlKey: true,
      metaKey: false,
      key: 'Space',
    } as React.KeyboardEvent;
    doFunctionWhenCmdOrCtrlEnter(event, func);
    expect(func).not.toHaveBeenCalled();
  });

  it('すべての条件が満たされている場合、関数を呼び出す', () => {
    const func = jest.fn();
    const event = {
      nativeEvent: { isComposing: false },
      ctrlKey: true,
      metaKey: false,
      key: 'Enter',
    } as React.KeyboardEvent;
    doFunctionWhenCmdOrCtrlEnter(event, func);
    expect(func).toHaveBeenCalled();
  });
});
