import * as React from 'react';
import Page from 'modules/App/components/Page';
import Panel from 'modules/App/components/Panel';

export interface TicketsListProps {}

const TicketsList: React.SFC<TicketsListProps> = () => {
  return (
    <Page>
      <Panel title="Lista zadań"></Panel>
    </Page>
  );
};

export default TicketsList;
