import React from 'react';
import { useHistory } from 'react-router-dom';
import { Ticket } from 'modules/Tickets/types';
import { Button } from 'modules/Form';
import styles from './styles.module.scss';

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
      <td className={styles.td}>{title}</td>
      <td className={styles.td}>{state}</td>
      <td className={styles.td}>{assignedTo && assignedTo.userName}</td>
      <td className={styles.td}>{createdAtBetterDate}</td>
      <td className={styles.td}>{lastModifiedBetterDate}</td>
      <td className={styles.td}>
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
