import { render } from '@testing-library/react';
import LifelogEditDialog from '@lifelog/container/LifelogEditDialog';
import { useLifelogEditDialog } from '@providers/LifelogEditDialogProvider';
import { lifelog } from '@lib/faker/lifelog';
import BaseLifelogEditDialog from '@lifelog/presentational/BaseLifelogEditDialog';

jest.mock('@providers/LifelogEditDialogProvider');
const mockUseLifelogEditDialog =
  useLifelogEditDialog as jest.MockedFunction<any>;
jest.mock('@lifelog/presentational/BaseLifelogEditDialog');

describe('LifelogEditDialog', () => {
  const base = BaseLifelogEditDialog as any;
  const log = lifelog();
  const _props = {
    isOpen: true,
    lifelog: log,
    editLifelog: jest.fn(),
    handleUpdateLifelog: jest.fn(),
    handleDeleteLifelog: jest.fn(),
    closeEditDialog: jest.fn(),
  };
  beforeEach(() => {
    mockUseLifelogEditDialog.mockReturnValue(_props);
  });

  it('LifelogEditProvider のプロパティを Props として BaseLifelogEditDialog へ渡されている', () => {
    render(<LifelogEditDialog />);
    expect(base).toHaveBeenCalled();
    expect(base.mock.calls[0][0]).toEqual(_props);
  });
});
