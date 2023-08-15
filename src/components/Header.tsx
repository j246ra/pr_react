import React from 'react';
import {
  Button,
  Navbar,
  Alignment,
  Menu,
  MenuItem,
  MenuDivider,
  Popover,
} from '@blueprintjs/core';
import { useUser } from '@providers/UserProvider';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@providers/AuthApiProvider';
import { useSession } from '@providers/SessionProvider';
import SearchInput from '@lifelog/presentational/SearchInput';
import { useLifelog } from '@providers/LifelogProvider';

const Header = () => {
  const { removeHeaders } = useSession();
  const navigate = useNavigate();
  const { isLogin, clearUser } = useUser();
  const { authApi } = useAuth();
  const { clear: clearLifelog } = useLifelog();

  const handleLogout = () => {
    authApi.signOut().finally(() => {
      clearUser();
      clearLifelog();
      removeHeaders();
      navigate('/login');
    });
  };

  return (
    <Navbar fixedToTop={true}>
      <div className={'app-max-width m-w-auto p-w-20'}>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>
            <a href="/">Lifelog</a>
          </Navbar.Heading>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <SearchInput isShow={isLogin()} />
          <Navbar.Divider />
          <Popover
            content={
              <Menu>
                <MenuItem icon="plus" text="新規作成" />
                <MenuItem icon="search" text="詳細検索" />
                <MenuDivider />
                <MenuItem text="設定" icon="cog" intent="primary">
                  <MenuItem
                    icon="edit"
                    text="アカウント編集"
                    href={'/update_account'}
                    disabled={!isLogin()}
                  />
                  <MenuItem
                    icon="log-out"
                    text="ログアウト"
                    onClick={handleLogout}
                    disabled={!isLogin()}
                  />
                </MenuItem>
              </Menu>
            }
            placement="bottom-end"
          >
            <Button icon="menu" minimal={true} />
          </Popover>
        </Navbar.Group>
      </div>
    </Navbar>
  );
};

export default Header;
