import React from "react";
import styles from "./styles.module.scss";
import cx from "classnames";
import { Switch, Route, Redirect } from "react-router-dom";

export interface DashboardProps {}

const wtf: React.SFC = () => {
  return <div className={styles.blue}>asdasdasd sadasd asd asd asd</div>;
};

const Dashboard: React.SFC<DashboardProps> = () => {
  return (
    <div>
      <h1 className={cx(styles.blue, "title")}>Witoj</h1>
      <h2>ha dwa</h2>

      <Switch>
        <Route exact path="/wtf" component={wtf} />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </div>
  );
};

export default Dashboard;
