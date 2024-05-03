import { render } from '@testing-library/react';
import LifelogListLoader from '@lifelog/presentational/LifelogListLoader';
import { LIFELOG_LIST_TEST_ID as TEST_ID } from '@lib/consts/testId';

describe('LifelogListLoader', () => {
  it('表示されていること', () => {
    const { container, getByTestId } = render(
      <table>
        <tbody>
          <LifelogListLoader />
        </tbody>
      </table>
    );
    const el = getByTestId(TEST_ID.SPINNER);
    expect(el.tagName).toEqual('TR');
    expect(container.getElementsByClassName('spinnerTd')).toHaveLength(1);
  });
});
