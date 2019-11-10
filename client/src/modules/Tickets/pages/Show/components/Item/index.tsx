import React from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';
import { translateMessages } from 'utils';

export interface ItemProps {
  children: string | number;
  title: string;
  translate?: boolean;
}

const Item: React.FC<ItemProps> = ({ children, title, translate }) => {
  const translateItem = item => {
    if (typeof item === 'string') {
      return translateMessages(String(children));
    } else return children;
  };

  return (
    <li className={cx(styles.item, title === 'Opis' && styles.description)}>
      <small>
        <strong>{title}</strong>
      </small>
      {children || children === 0 ? (
        <p>{translate ? translateItem(children) : children}</p>
      ) : (
        <i>— brak —</i>
      )}
    </li>
  );
};

export default Item;
