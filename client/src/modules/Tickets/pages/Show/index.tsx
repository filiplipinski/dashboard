import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import useRequestApi, { IRequestData } from 'utils/http';
import styles from './styles.module.scss';
import { Ticket } from 'modules/Tickets/models';

import Page from 'modules/App/components/Page';
import Panel from 'modules/App/components/Panel';
import Loader from 'modules/App/components/Loader';
import Comment from './components/Comment';
import AddComment from './components/AddComment';

import Item from './components/Item';

interface ITicketResponse extends IRequestData {
  data: {
    success: string;
    ticket: Ticket;
  };
}

// TODO: dorobic gdy nie ma takiego ticketu, wyswietlic jakis blad czy cos
const TicketShow: React.FC<RouteComponentProps> = ({ match }) => {
  const { id } = match.params as { id: string };
  const requestAsync = useRequestApi() as ITicketResponse;
  const { requestApi } = requestAsync;

  useEffect(() => {
    requestApi(`api/ticket/show/${id}`);
  }, []);

  return (
    <Page>
      <Loader async={requestAsync}>
        {({ data }) => {
          const {
            title,
            state,
            assignedTo,
            createdAt,
            lastModified,
            priority,
            progress,
            comments,
            description,
          } = data.ticket;

          const createdAtBetterDate = new Date(createdAt).toLocaleString();
          const lastModifiedBetterDate = new Date(lastModified).toLocaleString();

          return (
            <Panel title={title}>
              <ul className={styles.flexWrapper}>
                <Item title="Stan" translate>
                  {state}
                </Item>
                <Item title="Przypisane do">{assignedTo && assignedTo.userName}</Item>
                <Item title="Utworzono">{createdAtBetterDate}</Item>
                <Item title="Zmodyfikowano">{lastModifiedBetterDate}</Item>
                <Item title="Priorytet" translate>
                  {priority}
                </Item>
                <Item title="Progres">{progress}</Item>
                <Item title="Opis">{description}</Item>
              </ul>
              <div className={styles.commentsWrapper}>
                {comments.map((comment, index) => (
                  <Comment comment={comment} key={index} />
                ))}
              </div>
              <AddComment ticketId={id} refetchTicket={requestAsync.refetch} />
            </Panel>
          );
        }}
      </Loader>
    </Page>
  );
};

export default TicketShow;
