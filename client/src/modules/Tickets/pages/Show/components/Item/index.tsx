import React from 'react';
import cx from 'classnames';
import { Line } from 'rc-progress';

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
      {typeof children === 'number' ? (
        <Line
          percent={children as number}
          strokeColor={children === 0 ? 'hsl(0, 0%, 92%)' : 'hsl(217, 71%, 53%)'}
          trailColor="hsl(0, 0%, 92%)"
          strokeWidth={20}
          trailWidth={20}
          style={{ maxWidth: '150px', height: '20px', marginTop: '0.2em' }}
        />
      ) : children && typeof children !== 'number' ? (
        <p>{translate ? translateItem(children) : children}</p>
      ) : (
        <i>— brak —</i>
      )}
    </li>
  );
};

export default Item;
