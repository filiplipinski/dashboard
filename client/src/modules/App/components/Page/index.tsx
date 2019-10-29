import React from "react";
import styles from "./styles.module.scss";
import cx from "classnames";

export interface PageProps {}

const Page: React.FC<PageProps> = ({ children }) => {
  return (
    <div className={cx(styles.wrapper, "")}>
      <div className={cx(styles.insideWrapper, "")}>{children}</div>
    </div>
  );
};

export default Page;
