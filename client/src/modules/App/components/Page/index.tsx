import React from 'react';
import styles from './styles.module.scss';

const Page: React.FC = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default Page;
