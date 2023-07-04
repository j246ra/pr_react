import React from 'react';
import {
  Button,
  Navbar,
  Alignment,
  Menu,
  MenuItem,
  MenuDivider,
} from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2';
import { useUser } from '@providers/UserProvider';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@providers/AuthApiProvider';
import { useSession } from '@providers/SessionProvider';

const Header = () => {
  const { removeToken } = useSession();
  const navigate = useNavigate();
  const { isLogin, clearUser } = useUser();
  const { authApi } = useAuth();

  const handleLogout = () => {
    authApi.signOut().finally(() => {
      clearUser();
      removeToken();
      navigate('/login');
    });
  };

  return (
    <Navbar fixedToTop={true}>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>
          <a href="/">Lifelog</a>
        </Navbar.Heading>
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <Popover2
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
        </Popover2>
      </Navbar.Group>
    </Navbar>
  );
};

export default Header;
