import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import LifelogEditDialog from '@lifelog/container/LifelogEditDialog';
import { useLifelog } from '@providers/LifelogProvider';
import { LIFELOG_EDIT_DIALOG_TEST_ID as TEST_ID } from '@lib/consts/testId';

jest.mock('@providers/LifelogProvider');

const mockUseLifelog = useLifelog as jest.MockedFunction<any>;
const mockHandleCloseDialog = jest.fn();

describe('LifelogEditDialog', () => {
  beforeEach(() => {
    mockUseLifelog.mockReturnValue({
      updateLog: jest.fn(),
    });
  });

  xit('Props isOpen でのダイアログ開閉検証', async () => {
    const { rerender } = render(<LifelogEditDialog />);
    expect(screen.getByTestId(TEST_ID.BASE)).toBeInTheDocument();
    rerender(<LifelogEditDialog />);
    await waitFor(() => {
      expect(screen.queryByTestId(TEST_ID.BASE)).not.toBeInTheDocument();
    });
  });

  xit('Props handleCloseDialog', async () => {
    render(<LifelogEditDialog />);
    expect(screen.getByTestId(TEST_ID.BASE)).toBeInTheDocument();
    fireEvent.keyDown(screen.getByTestId(TEST_ID.BASE), {
      key: 'Escape',
    });
    expect(mockHandleCloseDialog).toHaveBeenCalled();
  });
});
