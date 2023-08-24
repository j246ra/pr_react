import * as process from 'process';

const env = (key: string, defaultValue?: string) => {
  const value = process.env[`REACT_APP_${key.toUpperCase()}`];
  return value || defaultValue;
};

export default env;
