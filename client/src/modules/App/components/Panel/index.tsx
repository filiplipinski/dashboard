import React from 'react';
import styles from './styles.module.scss';
import cx from 'classnames';

export interface PanelProps {
  title: string;
}
const Panel: React.FC<PanelProps> = ({ children, title }) => {
  return (
    <>
      <h4 className={cx(styles.title, 'title is-5')}>{title}</h4>
      <div className={styles.wrapper}>{children}</div>
    </>
  );
};

export default Panel;
