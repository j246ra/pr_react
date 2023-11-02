import { Meta } from '@storybook/react';
import LifelogListHeader from './LifelogListHeader';
import BaseLayout from '@src/components/BaseLayout';
import { Toaster } from 'react-hot-toast';
import Header from '@src/components/Header';
import { HTMLTable } from '@blueprintjs/core';
import { lifelogMocks } from '../../../lib/storybook/lifelog';

export default {
  title: 'Lifelog/Presentational/LifelogListHeader',
  component: LifelogListHeader,
  decorators: [
    (Story) => (
      <div className={'App'}>
        <Toaster />
        <Header />
        <BaseLayout>
          <HTMLTable
            bordered={false}
            style={{ width: '100%', margin: '0 auto' }}
          >
            <Story />
            <tbody>
              <tr>
                <td colSpan={4}></td>
              </tr>
            </tbody>
          </HTMLTable>
        </BaseLayout>
      </div>
    ),
  ],
} as Meta;

const { all } = lifelogMocks();

export const Default = {
  args: {
    enabled: true,
  },
  parameters: {
    msw: all(),
  },
};
