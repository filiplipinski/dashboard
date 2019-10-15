import React from "react";
import cx from "classnames";
import styles from "./styles.module.scss";

export interface ErrorProps {}

const Error: React.SFC<ErrorProps> = ({ children }) => {
  return <p className={cx(styles.error, "has-text-danger")}>{children}</p>;
};

export default Error;
