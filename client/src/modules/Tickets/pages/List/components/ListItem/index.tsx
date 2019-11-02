import React from 'react';
import { Ticket } from 'modules/Tickets/types';
import styles from './styles.module.scss';

export interface ListItemProps {
  ticket: Ticket;
}

const ListItem: React.FC<ListItemProps> = ({ ticket }) => {
  const { title, state, assignedTo, createdAt, lastModified } = ticket;

  const createdAtBetterDate = new Date(createdAt).toLocaleString();
  const lastModifiedBetterDate = new Date(lastModified).toLocaleString();

  console.log(styles);
  return (
    <tr className={styles.tr}>
      <td className={styles.td}>{title}</td>
      <td className={styles.td}>{state}</td>
      <td className={styles.td}>{assignedTo}</td>
      <td className={styles.td}>{createdAtBetterDate}</td>
      <td className={styles.td}>{lastModifiedBetterDate}</td>
      <td className={styles.td}>
        <button className="button is-link">Open</button>
      </td>
    </tr>
  );
};

export default ListItem;
