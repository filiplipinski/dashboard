import React from "react";

export interface ButtonProps {
  type: "button" | "submit";
  text: string;
}

const Button: React.SFC<ButtonProps> = ({ type, text }) => {
  return (
    <div className={type === "submit" ? "field" : undefined}>
      <div className="control">
        <button className="button is-link">{text}</button>
      </div>
    </div>
  );
};

export default Button;
