import React, { useEffect } from 'react';
import cx from 'classnames';
import useRequestApi, { IRequestData } from 'utils/http';
import Page from 'modules/App/components/Page';
import Panel from 'modules/App/components/Panel';
import Loader from 'modules/App/components/Loader';
import ListItem from 'modules/Tickets/pages/List/components/ListItem';
import { Ticket } from 'modules/Tickets/models';
import styles from './styles.module.scss';

interface ITicketsListResponse extends IRequestData {
  data: {
    success: string;
    tickets: Array<Ticket>;
  };
}

const TicketsList: React.FC = () => {
  const requestAsync = useRequestApi() as ITicketsListResponse;
  const { requestApi, data, refetch } = requestAsync;

  useEffect(() => {
    requestApi(`api/ticket/list`);
  }, []);

  return (
    <Page>
      <Loader async={requestAsync}>
        {() => {
          return (
            <Panel title={`Lista zadań`}>
              <div className={styles.tableScroll}>
                <table className={cx(styles.table, 'table')}>
                  <thead>
                    <tr>
                      <th className={styles.th}>Tytuł</th>
                      <th className={styles.th}>Grupa</th>
                      <th className={styles.th}>Stan</th>
                      <th className={styles.th}>Przypisane do</th>
                      <th className={styles.th}>Utworzono</th>
                      <th className={styles.th}>Zmodyfikowano</th>
                      <th className={styles.th}>Opcje</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.tickets.map(ticket => (
                      <ListItem ticket={ticket} key={ticket._id} refetchTicketList={refetch} />
                    ))}
                  </tbody>
                </table>
              </div>
            </Panel>
          );
        }}
      </Loader>
    </Page>
  );
};

export default TicketsList;
