import React from "react";
import styles from "./styles.module.scss";
import cx from "classnames";
import Page from "modules/App/components/Page";

export interface DashboardProps {}

const Dashboard: React.SFC<DashboardProps> = () => {
  return (
    <Page title="Zadania">
      <h2>ha dwa</h2>
    </Page>
  );
};

export default Dashboard;
