import React from "react";
import styles from "./styles.module.scss";
import cx from "classnames";

export interface DashboardProps {}

const Dashboard: React.SFC<DashboardProps> = () => {
  return (
    <div>
      <h1 className={cx(styles.green, "title")}>Witoj</h1>
      <h2 className={styles.green}>ha dwa</h2>
    </div>
  );
};

export default Dashboard;
