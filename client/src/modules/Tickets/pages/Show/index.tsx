import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styles from './styles.module.scss';
import Page from 'modules/App/components/Page';
import Panel from 'modules/App/components/Panel';
import Loader from 'modules/App/components/Loader';
import useRequestApi, { IRequestData } from 'utils/http';
import { Ticket } from 'modules/Tickets/types';

import Item from './components/Item';

type ticketUrlParams = {
  id: string;
};

interface ITicketResponse extends IRequestData {
  data: {
    success: string;
    ticket: Ticket;
  };
  errors: {
    error: any;
  };
}

const TicketShow: React.FC<RouteComponentProps> = ({ match }) => {
  const { id } = match.params as ticketUrlParams;
  const requestAsync = useRequestApi() as ITicketResponse;
  const { requestApi, data } = requestAsync;

  useEffect(() => {
    requestApi(`api/ticket/show/${id}`);
  }, []);

  return (
    <Page>
      <Loader async={requestAsync}>
        {() => {
          return (
            <Panel title={`Zadanie ${data.ticket.title}`}>
              <ul className={styles.flexWrapper}>
                <Item title="Stan">{data.ticket.state}</Item>
                <Item title="Przypisane do">{data.ticket.assignedTo}</Item>
                <Item title="Utworzono">{data.ticket.createdAt}</Item>
                <Item title="Zmodyfikowano">{data.ticket.lastModified}</Item>
                <Item title="Priorytet">{data.ticket.priority}</Item>
                <Item title="Progres">{data.ticket.progress}</Item>
              </ul>
            </Panel>
          );
        }}
      </Loader>
    </Page>
  );
};

export default TicketShow;
