import { render, screen } from '@testing-library/react';
import SessionOtherLinks from '@session/presentational/SessionOtherLinks';
import { SESSION_OTHER_LINKS_TEST_ID as TEST_ID } from '@lib/consts/testId';
import { BrowserRouter } from 'react-router-dom';

describe('SessionOtherLinks', () => {
  it('PasswordForgetLink enabled.', () => {
    render(
      <BrowserRouter>
        <SessionOtherLinks passwordForgetEnabled={true} />
      </BrowserRouter>
    );
    expect(screen.getByTestId(TEST_ID.PASSWORD_FORGET)).toBeInTheDocument();
  });
  it('SignUpLink enabled.', () => {
    render(
      <BrowserRouter>
        <SessionOtherLinks signUpEnabled={true} />
      </BrowserRouter>
    );
    expect(screen.getByTestId(TEST_ID.SIGN_UP)).toBeInTheDocument();
  });
  it('Enable all.', () => {
    render(
      <BrowserRouter>
        <SessionOtherLinks passwordForgetEnabled={true} signUpEnabled={true} />
      </BrowserRouter>
    );
    expect(screen.getByTestId(TEST_ID.PASSWORD_FORGET)).toBeInTheDocument();
    expect(screen.getByTestId(TEST_ID.SIGN_UP)).toBeInTheDocument();
  });
  it('Disable all.', () => {
    render(
      <BrowserRouter>
        <SessionOtherLinks
          passwordForgetEnabled={false}
          signUpEnabled={false}
        />
      </BrowserRouter>
    );
    expect(
      screen.queryByTestId(TEST_ID.PASSWORD_FORGET)
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId(TEST_ID.SIGN_UP)).not.toBeInTheDocument();
  });
  it('Undefined all.', () => {
    render(
      <BrowserRouter>
        <SessionOtherLinks />
      </BrowserRouter>
    );
    expect(
      screen.queryByTestId(TEST_ID.PASSWORD_FORGET)
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId(TEST_ID.SIGN_UP)).not.toBeInTheDocument();
  });
});
