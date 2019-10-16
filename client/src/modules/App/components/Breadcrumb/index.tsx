import React from "react";
import styles from "./styles.module.scss";

export interface BreadcrumbProps {}

const Breadcrumb: React.FC<BreadcrumbProps> = () => {
  return (
    <div className={styles.breadcrumbWrapper}>
      <nav className="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li>
            <a href="#">Dashboard</a>
          </li>
          <li>
            <a href="#">Zadania</a>
          </li>
          <li className="is-active">
            <a href="#" aria-current="page">
              Nowe zadanie
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Breadcrumb;
