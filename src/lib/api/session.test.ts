import createClient from './client';
import session from './session';
import { API, COMMON } from '@lib/consts/common';

jest.mock('./client');
const mockCreateClient = createClient as jest.MockedFunction<any>;

const ENDPOINT = API.SESSION.ENDPOINT;

describe('session APIの呼び出し検証', () => {
  beforeEach(() => {
    mockCreateClient.mockReturnValue({
      post: jest.fn().mockResolvedValue({
        data: {},
      }),
      put: jest.fn().mockResolvedValue({
        data: {},
      }),
      delete: jest.fn().mockResolvedValue({
        data: {},
      }),
      get: jest.fn().mockResolvedValue({
        data: {},
      }),
      interceptors: {
        response: {
          use: jest.fn(),
        },
      },
    });
  });

  const headers = () => {
    return { 'access-token': 'token', client: 'client', uid: 'uid' };
  };

  it('signIn', async () => {
    const email = 'test@example.com';
    const password = 'password';

    const { signIn } = session(headers);
    await signIn(email, password);

    expect(mockCreateClient().post).toHaveBeenCalledWith(ENDPOINT.SIGN_IN, {
      email,
      password,
    });
  });

  it('signUp', async () => {
    const email = 'test@example.com';
    const password = 'password';

    const { signUp } = session(headers);
    await signUp(email, password);

    expect(mockCreateClient().post).toHaveBeenCalledWith(ENDPOINT.USER, {
      email,
      password,
    });
  });

  it('updateUser', async () => {
    const userParams = { email: 'new@example.com', password: 'new_password' };

    const { updateUser } = session(headers);
    await updateUser(userParams);

    expect(mockCreateClient().put).toHaveBeenCalledWith(
      ENDPOINT.USER,
      userParams,
      {
        headers: headers(),
      }
    );
  });

  it('singOut', async () => {
    const { signOut } = session(headers);
    await signOut();

    expect(mockCreateClient().delete).toHaveBeenCalledWith(ENDPOINT.SIGN_OUT, {
      headers: headers(),
    });
  });

  it('deleteUser', async () => {
    const { deleteUser } = session(headers);
    await deleteUser();

    expect(mockCreateClient().delete).toHaveBeenCalledWith(ENDPOINT.USER, {
      headers: headers(),
    });
  });

  it('validate', async () => {
    const { validate } = session(headers);
    await validate();

    expect(mockCreateClient().get).toHaveBeenCalledWith(ENDPOINT.VALIDATE, {
      headers: headers(),
    });
  });

  it('passwordForget', async () => {
    const email = 'test@example.com';
    const { passwordForget } = session(headers);
    await passwordForget(email);

    expect(mockCreateClient().post).toHaveBeenCalledWith(
      ENDPOINT.PASSWORD_RESET,
      {
        email,
        redirect_url: `${COMMON.APP_URL.HOST_URL}${COMMON.APP_URL.BASE_DIR}/password_edit`,
      }
    );
  });

  it('passwordReset', async () => {
    const newHeaders = {
      'access-token': 'new_token',
      'uid': 'new_uid',
      'client': 'new_client',
    }
    const password = 'password';
    const passwordConfirmation = 'password';
    const { passwordReset } = session(headers);
    await passwordReset(password, passwordConfirmation, newHeaders);

    expect(mockCreateClient().put).toHaveBeenCalledWith(
      ENDPOINT.PASSWORD_RESET,
      {
        password: password,
        password_confirmation: passwordConfirmation,
      },
      { headers: newHeaders },
    );
  });
});
