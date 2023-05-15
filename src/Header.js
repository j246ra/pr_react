import React from 'react';
import {
  Button,
  Navbar,
  Alignment,
  Popover,
  Menu,
  MenuItem,
  MenuDivider,
} from '@blueprintjs/core';
import { useUser } from './providers/UserProvider';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './providers/AuthApiProvider';

const Header = () => {
  const navigate = useNavigate();
  const { isLogin, clearUser } = useUser();
  const { authApi } = useAuth();

  const handleLogout = () => {
    authApi
      .signOut()
      .then(() => {
        clearUser();
        navigate('/login');
      })
      .catch(() => {
        clearUser();
        navigate('/login');
      });
  };

  return (
    <Navbar>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>
          <a href="/">Lifelog</a>
        </Navbar.Heading>
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
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
          placement="bottom"
        >
          <Button icon="menu" minimal="true" />
        </Popover>
      </Navbar.Group>
    </Navbar>
  );
};

export default Header;
