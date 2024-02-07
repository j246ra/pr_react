import notify from '@lib/toast';
import toast from 'react-hot-toast';
import { NOTIFY } from '@lib/consts/common';

jest.mock('react-hot-toast');
const mockToast = jest.mocked(toast);
describe('toast', () => {
  describe('success', () => {
    it('メッセージが表示されている', () => {
      notify.success('成功');
      expect(mockToast.success).toHaveBeenCalled();
      expect(mockToast.success).toHaveBeenCalledWith('成功');
    });
    it('メッセージが空白の場合は表示しない', () => {
      notify.success('');
      expect(mockToast.success).not.toHaveBeenCalled();
    });
    it('メッセージが undefined の場合は表示しない', () => {
      notify.success();
      expect(mockToast.success).not.toHaveBeenCalled();
    });
  });
  describe('error', () => {
    it('メッセージが表示されている', () => {
      notify.error('エラー');
      expect(mockToast.error).toHaveBeenCalled();
      expect(mockToast.error).toHaveBeenCalledWith(
        'エラー',
        NOTIFY.STYLE.ERROR
      );
    });
    it('メッセージが空白の場合は表示しない', () => {
      notify.error('');
      expect(mockToast.success).not.toHaveBeenCalled();
    });
    it('メッセージが undefined の場合は表示しない', () => {
      notify.error();
      expect(mockToast.success).not.toHaveBeenCalled();
    });
  });
});
