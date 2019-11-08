import React from 'react';
import { useHistory } from 'react-router-dom';
import { Ticket } from 'modules/Tickets/models';
import { Button } from 'modules/Form';
import styles from './styles.module.scss';
import { translateMessages } from 'utils';

export interface ListItemProps {
  ticket: Ticket;
}

const ListItem: React.FC<ListItemProps> = ({ ticket }) => {
  const { _id, title, state, assignedTo, createdAt, lastModified } = ticket;
  const history = useHistory();

  const createdAtBetterDate = new Date(createdAt).toLocaleString();
  const lastModifiedBetterDate = new Date(lastModified).toLocaleString();

  return (
    <tr className={styles.tr}>
      <td>
        <a className={styles.link} href={`/tickets/show/${_id}`}>
          {title}
        </a>
      </td>
      <td>{translateMessages(state)}</td>
      <td>{assignedTo ? assignedTo.userName : <i>— brak —</i>}</td>
      <td>{createdAtBetterDate}</td>
      <td>{lastModifiedBetterDate}</td>
      <td>
        <Button
          type="button"
          is-link
          is-small
          is-rounded
          onClick={() => history.push(`/tickets/show/${_id}`)}
        >
          Otwórz
        </Button>
      </td>
    </tr>
  );
};

export default ListItem;
