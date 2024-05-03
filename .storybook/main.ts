import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';
import paths from '../config/paths';

const config: StorybookConfig = {
  staticDirs: ['../public'],
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-essentials',
    {
      name: '@storybook/addon-styling-webpack',
      options: {
        rules: [
          {
            test: /\.s?css$/,
            use: [
              'style-loader',
              'css-loader',
              {
                loader: 'sass-loader',
                options: {
                  implementation: require.resolve('sass'),
                  sassOptions: {
                    includePaths: ['node_modules'],
                  },
                },
              },
            ],
          },
        ],
      },
    },
    'storybook-addon-cookie',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async (config) => {
    config.resolve ??= {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@src': paths.appSrc,
      '@lib': path.resolve(paths.appSrc, 'lib'),
      '@providers': path.resolve(paths.appSrc, 'providers'),
      '@validators': path.resolve(paths.appSrc, 'validators'),
      '@session': path.resolve(paths.appSrc, 'components/session'),
      '@lifelog': path.resolve(paths.appSrc, 'components/lifelog'),
    };
    return config;
  },
};
export default config;
