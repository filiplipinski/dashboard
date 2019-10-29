import React from "react";
import styles from "./styles.module.scss";
import cx from "classnames";
import Page from "modules/App/components/Page";

export interface DashboardProps {}

const Dashboard: React.SFC<DashboardProps> = () => {
  return (
    <Page>
      <div>
        {/* <h1 className={cx(styles.blue, "title")}>Witoj</h1> */}
        <h2>ha dwa</h2>
      </div>
    </Page>
  );
};

export default Dashboard;
