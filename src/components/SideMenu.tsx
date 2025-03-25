import React from 'react';
import {
  Button,
  Menu,
  MenuItem,
  MenuDivider,
  Popover,
} from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { HEADER } from '@lib/consts/component';
import { SIDE_MENU_TEST_ID as TEST_ID } from '@lib/consts/testId';
import { useNavigate } from 'react-router';
import { ROUTES } from '@lib/consts/common';
import useAccount from '@src/hooks/useAccount';
import { useUser } from '@providers/UserProvider';

export default function SideMenu() {
  const navigate = useNavigate();
  const { isLoggedIn } = useUser();
  const { logout } = useAccount();

  const handleLogout = () => {
    logout();
  };

  const handleAccountUpdate = () => {
    navigate(ROUTES.ACCOUNT_UPDATE);
  };

  return (
    <Popover
      content={
        <Menu>
          <MenuItem
            icon={IconNames.PLUS}
            text={HEADER.MENU.CREATE_LOG}
            disabled={true}
          />
          <MenuItem
            icon={IconNames.SEARCH}
            text={HEADER.MENU.SEARCH}
            disabled={true}
          />
          <MenuDivider />
          <MenuItem
            data-testid={TEST_ID.SETTINGS}
            icon={IconNames.COG}
            text={HEADER.MENU.TOP}
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
      minimal={true}
    >
      <Button
        data-testid={TEST_ID.BUTTON}
        icon={IconNames.MENU}
        minimal={true}
      />
    </Popover>
  );
}
