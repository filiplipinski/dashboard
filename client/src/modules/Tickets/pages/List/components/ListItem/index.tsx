import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Ticket } from 'modules/Tickets/models';
import { Button } from 'modules/Form';
import styles from './styles.module.scss';
import { translateMessages } from 'utils';
import useRequestApi from 'utils/http';

export interface ListItemProps {
  ticket: Ticket;
  refetchTicketList: () => void;
}

const ListItem: React.FC<ListItemProps> = ({ ticket, refetchTicketList }) => {
  const { _id, title, state, assignedTo, createdAt, lastModified, group } = ticket;
  const history = useHistory();
  const { requestApi, data, loading, called } = useRequestApi();

  const createdAtBetterDate = new Date(createdAt).toLocaleString();
  const lastModifiedBetterDate = new Date(lastModified).toLocaleString();

  const deleteTicket = () => {
    requestApi(`api/ticket/delete/${_id}`, 'DELETE');
  };

  useEffect(() => {
    if (called) {
      refetchTicketList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <tr className={styles.tr}>
      <td>
        <a className={styles.link} href={`/tickets/show/${_id}`}>
          {title}
        </a>
      </td>
      <td>{group && group.name}</td>
      <td>{translateMessages(state)}</td>
      <td>{assignedTo ? assignedTo.userName : <i>— brak —</i>}</td>
      <td>{createdAtBetterDate}</td>
      <td>{lastModifiedBetterDate}</td>
      <td>
        <div className="buttons">
          <Button type="button" is-link is-small is-rounded onClick={() => history.push(`/tickets/show/${_id}`)}>
            Otwórz
          </Button>
          <Button
            type="button"
            is-danger
            is-small
            is-rounded
            loading={loading}
            disabled={loading}
            onClick={deleteTicket}
          >
            Usuń
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default ListItem;
