import React from "react";
import styles from "./styles.module.scss";
import cx from "classnames";

export interface PageProps {
  title: string;
}

const Page: React.FC<PageProps> = ({ children, title }) => {
  return (
    <div className={styles.container}>
      <h4 className={cx(styles.title, "title is-5")}>{title}</h4>
      <div className={styles.wrapper}>{children}</div>
    </div>
  );
};

export default Page;
