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
import SearchInput from '@lifelog/presentational/SearchInput';
import styles from './Header.module.scss';
import { HEADER } from '@lib/consts/component';
import { IconNames } from '@blueprintjs/icons';
import { HEADER_TEST_ID as TEST_ID } from '@lib/consts/testId';
import { ROUTES } from '@lib/consts/common';
import useAccount from '@src/hooks/useAccount';

export default function Header() {
  const navigate = useNavigate();
  const { isLoggedIn } = useUser();
  const { logout } = useAccount();

  const handleLogout = () => {
    logout();
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
