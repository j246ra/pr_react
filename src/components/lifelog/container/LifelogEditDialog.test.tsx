import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import LifelogEditDialog from '@lifelog/container/LifelogEditDialog';
import { lifelog } from '@lib/faker/lifelog';
import { Lifelog, useLifelog } from '@providers/LifelogProvider';
import { LIFELOG_EDIT_DIALOG_TEST_ID as TEST_ID } from '@lib/consts/testId';

jest.mock('@providers/LifelogProvider');

const mockUseLifelog = useLifelog as jest.MockedFunction<any>;
const mockHandleCloseDialog = jest.fn();

let log: Lifelog;

describe('LifelogEditDialog', () => {
  beforeEach(() => {
    mockUseLifelog.mockReturnValue({
      updateLog: jest.fn(),
    });
    log = lifelog();
  });

  it('Props isOpen でのダイアログ開閉検証', async () => {
    const { rerender } = render(
      <LifelogEditDialog isOpen={true} handleCloseDialog={jest.fn} log={log} />
    );
    expect(screen.getByTestId(TEST_ID.BASE)).toBeInTheDocument();
    rerender(
      <LifelogEditDialog
        isOpen={false}
        handleCloseDialog={jest.fn()}
        log={log}
      />
    );
    await waitFor(() => {
      expect(screen.queryByTestId(TEST_ID.BASE)).not.toBeInTheDocument();
    });
  });

  it('Props handleCloseDialog', async () => {
    render(
      <LifelogEditDialog
        isOpen={true}
        handleCloseDialog={mockHandleCloseDialog}
        log={log}
      />
    );
    expect(screen.getByTestId(TEST_ID.BASE)).toBeInTheDocument();
    fireEvent.keyDown(screen.getByTestId(TEST_ID.BASE), {
      key: 'Escape',
    });
    expect(mockHandleCloseDialog).toHaveBeenCalled();
  });
});
