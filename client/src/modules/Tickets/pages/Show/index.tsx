import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import useRequestApi, { IRequestData } from 'utils/http';
import styles from './styles.module.scss';
import { Ticket } from 'modules/Tickets/models';

import Page from 'modules/App/components/Page';
import Panel from 'modules/App/components/Panel';
import Loader from 'modules/App/components/Loader';
import Comment from './components/Comment';
import EditTicketForm from './components/EditTicketForm';

import Item from './components/Item';

interface ITicketResponse extends IRequestData {
  data: {
    success: string;
    ticket: Ticket;
  };
}

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
            group,
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
                <Item title="Grupa">{group && group.name}</Item>
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
              <EditTicketForm
                ticketId={id}
                refetchTicket={requestAsync.refetch}
                group={group}
                initialSelectValues={{ state, assignedTo, priority, progress }}
              />
            </Panel>
          );
        }}
      </Loader>
    </Page>
  );
};

export default TicketShow;
