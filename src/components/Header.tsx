import React from 'react';
import { Navbar, Alignment } from '@blueprintjs/core';
import { Link } from 'react-router';
import SearchInput from '@lifelog/presentational/SearchInput';
import styles from './Header.module.scss';
import { useUser } from '@providers/UserProvider';
import SideMenu from './SideMenu';

export default function Header() {
  const { isLoggedIn } = useUser();

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
          <SideMenu />
        </Navbar.Group>
      </div>
    </Navbar>
  );
}
