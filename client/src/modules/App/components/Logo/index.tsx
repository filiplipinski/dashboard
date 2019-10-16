import * as React from "react";
import dashboardlogo from "assets/img/dashboardLogo.svg";
import styles from "./styles.module.scss";

const Logo: React.SFC = () => {
  return (
    <div className={styles.logoWrapper}>
      <img className={styles.logo} src={dashboardlogo} alt="Logo" />
    </div>
  );
};

export default Logo;
