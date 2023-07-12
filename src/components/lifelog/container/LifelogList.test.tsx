import React from "react";
import {render} from "@testing-library/react";
import LifelogList from "./LifelogList";
import {useSession} from "@providers/SessionProvider";
import {useAuth} from "@providers/AuthApiProvider";
import {useUser} from "@providers/UserProvider";
import {useLifelog} from "@providers/LifelogProvider";
import {lifelog} from "@lib/faker/lifelog";

jest.mock('@providers/SessionProvider');
jest.mock('@providers/AuthApiProvider');
jest.mock('@providers/UserProvider');
jest.mock('@providers/LifelogProvider');

const mockUseSession = useSession as jest.MockedFunction<any>;
const mockUseAuth = useAuth as jest.MockedFunction<any>;
const mockUseUser = useUser as jest.MockedFunction<any>;
const mockUseLifelog = useLifelog as jest.MockedFunction<any>;

const mockLogs = [lifelog()];
const action = mockLogs[0].action;
describe('LifelogList component',()=>{
  beforeEach(()=>{
    mockUseSession.mockReturnValue({
      removeToken: jest.fn(),
    });
    mockUseAuth.mockReturnValue({
      authApi: jest.fn(),
    });
    mockUseUser.mockReturnValue({
      clearUser: jest.fn(),
      updateUser: jest.fn(),
    });
    mockUseLifelog.mockReturnValue({
      logs: mockLogs,
      loadLogs: jest.fn(),
      newLog: lifelog,
      deleteLog: jest.fn(),
    });
  });
  it('LifelogItemのレンダリング',()=>{
    const {container} = render(
      <LifelogList/>
    );
    expect(container.getElementsByClassName('app-link-text')[0]).toHaveTextContent(action);
  });
});
