import React from 'react';
import styles from './styles.module.scss';

export interface ItemProps {
  children: string | number;
  title: string;
}

const Item: React.FC<ItemProps> = ({ children, title }) => {
  return (
    <li className={styles.item}>
      <p>{title}</p>
      <strong>{children}</strong>
    </li>
  );
};

export default Item;
