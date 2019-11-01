import React from 'react';
import styles from './styles.module.scss';
import cx from 'classnames';
import Page from 'modules/App/components/Page';
import Panel from 'modules/App/components/Panel';

export interface DashboardProps {}

const Dashboard: React.SFC<DashboardProps> = () => {
  return (
    <Page>
      <Panel title="Zadania">
        <h2>ha dwa</h2>
      </Panel>
    </Page>
  );
};

export default Dashboard;
