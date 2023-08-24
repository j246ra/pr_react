import notify from '@lib/toast';
import toast from 'react-hot-toast';
import { NOTIFY } from '@lib/consts/common';

jest.mock('react-hot-toast');
const mockToast = jest.mocked(toast);
describe('toast', () => {
  it('success', () => {
    notify.success('成功');
    expect(mockToast.success).toHaveBeenCalled();
    expect(mockToast.success).toHaveBeenCalledWith('成功');
  });
  it('error', () => {
    notify.error('エラー');
    expect(mockToast.error).toHaveBeenCalled();
    expect(mockToast.error).toHaveBeenCalledWith('エラー', NOTIFY.STYLE.ERROR);
  });
});
