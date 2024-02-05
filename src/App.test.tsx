import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import App from '@src/App';
import { NOTFOUND } from '@lib/consts/component';

const HEADER = 'Mocked Header';
jest.mock('@src/components/Header', () => () => <div>{HEADER}</div>);
const LOGIN = 'Mocked Login';
jest.mock('@session/container/Login', () => () => <div>{LOGIN}</div>);
const SIGN_UP = 'Mocked SignUp';
jest.mock('@session/container/SignUp', () => () => <div>{SIGN_UP}</div>);
const ACCOUNT_UPDATE = 'Mocked AccountUpdate';
jest.mock('@session/container/AccountUpdate', () => () => (
  <div>{ACCOUNT_UPDATE}</div>
));
const PASSWORD_FORGET = 'Mocked PasswordForget';
jest.mock('@session/container/PasswordForget', () => () => (
  <div>{PASSWORD_FORGET}</div>
));
const PASSWORD_EDIT = 'Mocked PasswordEdit';
jest.mock('@session/container/PasswordEdit', () => () => (
  <div>{PASSWORD_EDIT}</div>
));
const RESET_MAIL_SEND_SUCCESS = 'Mocked ResetMailSendSuccess';
jest.mock('@session/container/ResetMailSendSuccess', () => () => (
  <div>{RESET_MAIL_SEND_SUCCESS}</div>
));
const LIFELOGS = 'Mocked Lifelogs';
jest.mock('@lifelog/Lifelogs', () => () => <div>{LIFELOGS}</div>);

describe('正常系', () => {
  it('ルートの場合は Login をレンダリング', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(LOGIN)).toBeInTheDocument();
  });

  it('/login の場合は Login をレンダリング', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(LOGIN)).toBeInTheDocument();
  });

  it('/sign_up の場合は SingUp をレンダリング', () => {
    render(
      <MemoryRouter initialEntries={['/sign_up']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(SIGN_UP)).toBeInTheDocument();
  });

  it('/update_account の場合は UpdateAccount をレンダリング', () => {
    render(
      <MemoryRouter initialEntries={['/update_account']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(ACCOUNT_UPDATE)).toBeInTheDocument();
  });

  it('/password_forget の場合は PasswordForget をレンダリング', () => {
    render(
      <MemoryRouter initialEntries={['/password_forget']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(PASSWORD_FORGET)).toBeInTheDocument();
  });

  it('/send_success の場合は ResetMailSendSuccess をレンダリング', () => {
    render(
      <MemoryRouter initialEntries={['/send_success']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(RESET_MAIL_SEND_SUCCESS)).toBeInTheDocument();
  });

  it('/password_edit の場合は PasswordEdit をレンダリング', () => {
    render(
      <MemoryRouter initialEntries={['/password_edit']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(PASSWORD_EDIT)).toBeInTheDocument();
  });

  it('/lifelogs の場合は Lifelogs をレンダリング', () => {
    render(
      <MemoryRouter initialEntries={['/lifelogs']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(LIFELOGS)).toBeInTheDocument();
  });
});

describe('存在しないURLの場合', () => {
  it('NotFound が表示されている', () => {
    const badRoute = '/some/bad/route';
    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(NOTFOUND.CONTEXT)).toBeInTheDocument();
  });
});
