import React from 'react';
import {
  Button,
  Navbar,
  Alignment,
  Menu,
  MenuItem,
  MenuDivider,
  Popover,
  Intent,
} from '@blueprintjs/core';
import { useUser } from '@providers/UserProvider';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@providers/AuthApiProvider';
import { useSession } from '@providers/SessionProvider';
import SearchInput from '@lifelog/presentational/SearchInput';
import { useLifelog } from '@providers/LifelogProvider';
import styles from './Header.module.scss';
import { HEADER } from '@lib/consts/component';
import { IconNames } from '@blueprintjs/icons';
import { HEADER_TEST_ID as TEST_ID } from '@lib/consts/testId';
import { ROUTES } from '@lib/consts/common';

export default function Header() {
  const { removeHeaders } = useSession();
  const navigate = useNavigate();
  const { isLoggedIn, clearUser } = useUser();
  const { authApi } = useAuth();
  const { clear: clearLifelog } = useLifelog();

  const handleLogout = () => {
    authApi.signOut().finally(() => {
      clearUser();
      clearLifelog();
      removeHeaders();
      navigate(ROUTES.LOGIN);
    });
  };

  const handleAccountUpdate = () => navigate(ROUTES.ACCOUNT_UPDATE);

  return (
    <Navbar fixedToTop={true}>
      <div className={styles.base}>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>
            <Link to={'/'}>Lifelog</Link>
          </Navbar.Heading>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <SearchInput isShown={isLoggedIn()} />
          <Navbar.Divider />
          <Popover
            content={
              <Menu>
                <MenuItem
                  disabled={true}
                  icon={IconNames.PLUS}
                  text={HEADER.MENU.CREATE_LOG}
                />
                <MenuItem
                  disabled={true}
                  icon={IconNames.SEARCH}
                  text={HEADER.MENU.SEARCH}
                />
                <MenuDivider />
                <MenuItem
                  data-testid={TEST_ID.SETTINGS}
                  text={HEADER.MENU.TOP}
                  icon={IconNames.COG}
                  intent={Intent.PRIMARY}
                >
                  <MenuItem
                    data-testid={TEST_ID.EDIT_ACCOUNT}
                    icon={IconNames.EDIT}
                    text={HEADER.MENU.EDIT_ACCOUNT}
                    onClick={handleAccountUpdate}
                    disabled={!isLoggedIn()}
                  />
                  <MenuItem
                    data-testid={TEST_ID.LOGOUT}
                    icon={IconNames.LOG_OUT}
                    text={HEADER.MENU.LOG_OUT}
                    onClick={handleLogout}
                    disabled={!isLoggedIn()}
                  />
                </MenuItem>
              </Menu>
            }
            placement="bottom-end"
          >
            <Button
              data-testid={TEST_ID.BUTTON}
              icon={IconNames.MENU}
              minimal={true}
            />
          </Popover>
        </Navbar.Group>
      </div>
    </Navbar>
  );
}
