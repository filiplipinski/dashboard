import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'modules/Form';
import Cookies from 'js-cookie';
import dashboardlogo from 'assets/img/dashboardLogo.svg';
import { useHistory } from 'react-router-dom';
import cx from 'classnames';
import styles from './styles.module.scss';

const NavBar: React.FC = () => {
  const history = useHistory();
  const handleLogout = () => {
    Cookies.remove('AUTHORIZATION_JWT');
    history.push('/user/login');
  };
  const [hamburgerState, setHamburgerState] = useState(false);

  return (
    <nav className={cx(styles.nav, 'navbar')} role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a
          role="button"
          className="navbar-item has-text-link"
          onClick={() => history.push('/')}
          style={{ fontWeight: 'bold' }}
        >
          Dashboard
        </a>
        {/* <a className="navbar-item" onClick={() => history.push("/")}>
          <img src={dashboardlogo} alt="logo" />
        </a> */}

        <a
          role="button"
          className={cx(hamburgerState && 'is-active', 'navbar-burger burger')}
          aria-label="menu"
          aria-expanded="true"
          onClick={() => setHamburgerState(!hamburgerState)}
        >
          <span></span>
          <span></span>
          <span></span>
        </a>
      </div>

      <div className={cx(hamburgerState && 'is-active', 'navbar-menu')}>
        <div className="navbar-start">
          <a
            role="button"
            className="navbar-item"
            onClick={() => {
              history.push('/');
              setHamburgerState(false);
            }}
          >
            Strona główna
          </a>
          <a
            role="button"
            className="navbar-item"
            onClick={() => {
              history.push('/tickets/show/5dbb2310f67d543c84053a79');
              setHamburgerState(false);
            }}
          >
            Zadania
          </a>
        </div>

        <div className="navbar-end">
          {hamburgerState ? (
            <a role="button" className="navbar-item" onClick={handleLogout}>
              <strong>Wyloguj</strong>
            </a>
          ) : (
            <div className="navbar-item">
              <Button type="button" is-link navbar-item onClick={handleLogout}>
                <strong>Wyloguj</strong>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
