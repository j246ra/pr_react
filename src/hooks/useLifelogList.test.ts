import { useLifelog } from '@providers/LifelogProvider';
import useLifelogList from '@src/hooks/useLifelogList';
import { LIFELOG_LIST } from '@lib/consts/component';
import toast from 'react-hot-toast';
import { lifelog } from '@lib/faker/lifelog';

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
  it('lifelogLoader 正常系', async () => {
    const { lifelogLoader } = useLifelogList();
    await lifelogLoader();
    expect(mockUseLifelog().loadLogs).toHaveBeenCalledWith(
      LIFELOG_LIST.MESSAGE.ERROR
    );
    expect(mockToast.error).not.toHaveBeenCalled();
  });

  it('lifelogLoader 取得データ異常', async () => {
    mockUseLifelog().loadLogs = jest
      .fn()
      .mockReturnValue(Promise.resolve(invalidResponse()));
    const { lifelogLoader } = useLifelogList();
    await lifelogLoader();
    expect(mockUseLifelog().loadLogs).toHaveBeenCalledWith(
      LIFELOG_LIST.MESSAGE.ERROR
    );
    expect(mockToast.error).toHaveBeenCalledWith(
      LIFELOG_LIST.MESSAGE.INVALID_DATA,
      expect.anything()
    );
  });
});
