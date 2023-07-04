import { Meta } from '@storybook/react';
import LifelogListHeader from './LifelogListHeader';
import BaseLayout from '../../BaseLayout';
import { Toaster } from 'react-hot-toast';
import Header from '../../Header';

export default {
  title: 'Components/Lifelog/LifelogListHeader',
  component: LifelogListHeader,
  decorators: [
    (Story) => (
      <div className={'App'}>
        <Toaster />
        <Header />
        <BaseLayout>
          <table style={{ width: '100%', margin: '0 auto' }}>
            <Story />
            <tbody>
              <tr>
                <td colSpan={4}></td>
              </tr>
            </tbody>
          </table>
        </BaseLayout>
      </div>
    ),
  ],
} as Meta;

export const Default = {
  args: {
    enabled: true,
  },
};
