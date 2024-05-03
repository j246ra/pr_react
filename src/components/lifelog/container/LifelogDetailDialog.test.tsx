import { useLifelogDetailDialog } from '@providers/LifelogDetailDialogProvider';
import { lifelog } from '@lib/faker/lifelog';
import { render } from '@testing-library/react';
import LifelogDetailDialog from '@lifelog/container/LifelogDetailDialog';
import BaseLifelogDetailDialog from '@lifelog/presentational/BaseLifelogDetailDialog';

jest.mock('@providers/LifelogDetailDialogProvider');
const mockUseLifelogDetailDialog =
  useLifelogDetailDialog as jest.MockedFunction<any>;
jest.mock('@lifelog/presentational/BaseLifelogDetailDialog');

describe('LifelogDetailDialog', () => {
  const base = BaseLifelogDetailDialog as any;
  const log = lifelog();
  const _props = {
    isOpen: true,
    log: log,
    closeDetailDialog: jest.fn(),
  };
  beforeEach(() => {
    mockUseLifelogDetailDialog.mockReturnValue(_props);
  });
  it('LifelogDetailProvider のプロパティを Props として BaseLifelogDetailDialog へ渡されている', () => {
    render(<LifelogDetailDialog />);
    expect(base).toHaveBeenCalled();
    expect(base.mock.calls[0][0]).toEqual(_props);
  });
});
