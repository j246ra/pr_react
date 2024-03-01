import { useLifelog } from '@providers/LifelogProvider';
import useLifelogList from '@src/hooks/useLifelogList';
import { LIFELOG_LIST } from '@lib/consts/component';
import toast from 'react-hot-toast';
import { lifelog } from '@lib/faker/lifelog';
import { act, renderHook, waitFor } from '@testing-library/react';

jest.mock('@providers/LifelogProvider');
const mockUseLifelog = useLifelog as jest.MockedFunction<any>;

jest.mock('react-hot-toast');
const mockToast = jest.mocked(toast);

const invalidResponse = () => {
  return {
    data: {
      validData: [],
      invalidData: [
        { data: 'abc', errors: ['error_01', 'error_02'] },
        { data: 'xyz', errors: ['error_98', 'error_99'] },
      ],
    },
  };
};

const validResponse = () => {
  return {
    data: {
      validData: [lifelog()],
      invalidData: [],
    },
  };
};

describe('useLifelogList', () => {
  beforeEach(() => {
    mockUseLifelog.mockReturnValue({
      loadLogs: jest.fn().mockReturnValue(Promise.resolve(validResponse())),
      isTerminated: false,
    });
  });
  describe('lifelogLoader', () => {
    it('正常系', async () => {
      const { result } = renderHook(useLifelogList);
      await result.current.lifelogLoader();
      expect(mockUseLifelog().loadLogs).toHaveBeenCalledWith(
        LIFELOG_LIST.MESSAGE.ERROR
      );
      expect(mockToast.error).not.toHaveBeenCalled();
    });

    it('取得データ異常', async () => {
      mockUseLifelog().loadLogs = jest
        .fn()
        .mockReturnValue(Promise.resolve(invalidResponse()));
      const { result } = renderHook(useLifelogList);
      await result.current.lifelogLoader();
      expect(mockUseLifelog().loadLogs).toHaveBeenCalledWith(
        LIFELOG_LIST.MESSAGE.ERROR
      );
      expect(mockToast.error).toHaveBeenCalledWith(
        LIFELOG_LIST.MESSAGE.INVALID_DATA,
        expect.anything()
      );
    });
  });

  describe('hasMore', () => {
    it('true -> false', async () => {
      const { result, rerender } = renderHook(useLifelogList);
      expect(result.current.hasMore).toEqual(true);
      act(() => {
        mockUseLifelog().isTerminated = true;
      });
      rerender();
      await waitFor(() => {
        expect(result.current.hasMore).toEqual(false);
      });
    });
    it('false -> true', async () => {
      mockUseLifelog().isTerminated = true;
      const { result, rerender } = renderHook(useLifelogList);
      expect(result.current.hasMore).toEqual(false);
      act(() => {
        mockUseLifelog().isTerminated = false;
      });
      rerender();
      await waitFor(() => {
        expect(result.current.hasMore).toEqual(true);
      });
    });
  });
});
