import * as process from 'process';
import env from '@lib/appEnv';

process.env.REACT_APP_ENV_TEST = 'test';

it('env', () => {
  expect(env('env_test')).toEqual('test');
  expect(env('env_test', 'Hello!')).toEqual('test');
  expect(env('xyz', 'abc')).toEqual('abc');
  expect(env('xyz')).toBeUndefined();
});
