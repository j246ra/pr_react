import client from './client';
import session from './session';

jest.mock('./client');

const mockedClient = client as jest.Mocked<typeof client>;

describe('session APIの呼び出し検証', () => {
  const headers = () => {
    return { 'access-token': 'token', client: 'client', uid: 'uid' };
  };

  beforeEach(() => {
    mockedClient.post.mockReset();
    mockedClient.put.mockReset();
    mockedClient.get.mockReset();
    mockedClient.delete.mockReset();
  });

  it('signIn', async () => {
    const email = 'test@example.com';
    const password = 'password';

    const { signIn } = session(headers);
    await signIn(email, password);

    expect(mockedClient.post).toHaveBeenCalledWith('/auth/sign_in', {
      email,
      password,
    });
  });

  it('signUp', async () => {
    const email = 'test@example.com';
    const password = 'password';

    const { signUp } = session(headers);
    await signUp(email, password);

    expect(mockedClient.post).toHaveBeenCalledWith('/auth', {
      email,
      password,
    });
  });

  it('updateUser', async () => {
    const userParams = { email: 'new@example.com', password: 'new_password' };

    const { updateUser } = session(headers);
    await updateUser(userParams);

    expect(mockedClient.put).toHaveBeenCalledWith('/auth', userParams, {
      headers: headers(),
    });
  });

  it('singOut', async () => {
    const { signOut } = session(headers);
    await signOut();

    expect(mockedClient.delete).toHaveBeenCalledWith('/auth/sign_out', {
      headers: headers(),
    });
  });

  it('deleteUser', async () => {
    const { deleteUser } = session(headers);
    await deleteUser();

    expect(mockedClient.delete).toHaveBeenCalledWith('/auth', {
      headers: headers(),
    });
  });

  it('validate', async () => {
    const { validate } = session(headers);
    await validate();

    expect(mockedClient.get).toHaveBeenCalledWith('/auth/validate_token', {
      headers: headers(),
    });
  });

  it('passwordForget', async () => {
    const email = 'test@example.com';
    const { passwordForget } = session(headers);
    await passwordForget(email);

    expect(mockedClient.post).toHaveBeenCalledWith('/auth/password', {
      email,
      redirect_url: `${process.env.REACT_APP_HOST_URL}/password_edit`,
    });
  });

  it('passwordReset', async () => {
    const password = 'password';
    const passwordConfirmation = 'password';
    const { passwordReset } = session(headers);
    await passwordReset(password, passwordConfirmation);

    expect(mockedClient.put).toHaveBeenCalledWith(
      '/auth/password',
      {
        password: password,
        password_confirmation: passwordConfirmation,
      },
      { headers: headers() }
    );
  });
});
