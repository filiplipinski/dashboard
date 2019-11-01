import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.scss';

export interface SideMenuProps {}

const SideMenu: React.FC<SideMenuProps> = () => {
  const history = useHistory();

  return (
    <div className={styles.sideMenuWrapper}>
      <aside className="menu">
        <p className="menu-label">Ogólne</p>
        <ul className="menu-list">
          <li onClick={() => history.push('/')}>
            <a>Dashboard</a>
          </li>
          <li onClick={() => history.push('/tickets/show/5dbb2310f67d543c84053a79')}>
            <a>Zadania</a>
          </li>
        </ul>

        <p className="menu-label">Ustawienia</p>
        <ul className="menu-list">
          <li>
            <a>Ustawienia konta</a>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default SideMenu;
