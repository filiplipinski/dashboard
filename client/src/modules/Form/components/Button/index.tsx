import React from "react";
import cx from "classnames";

export interface ButtonProps {
  type: "button" | "submit";
  onClick?: () => void;
}

const Button: React.SFC<ButtonProps> = ({
  type,
  children,
  onClick,
  ...styles
}) => {
  const formButton = (
    <div className="field">
      {/* class control needed for form */}
      <div className="control">
        <button className={cx(styles, "button is-link")}>{children}</button>
      </div>
    </div>
  );

  const linkButton = (
    <a className={cx(styles, "button")} onClick={onClick}>
      {children}
    </a>
  );

  return <>{type === "submit" ? formButton : linkButton}</>;
};

export default Button;
