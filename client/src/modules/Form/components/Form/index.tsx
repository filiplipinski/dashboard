import React from "react";

export interface FormProps {
  onSubmit: any;
}

const Form: React.SFC<FormProps> = ({ children, onSubmit }) => {
  return <form onSubmit={onSubmit}>{children}</form>;
};

export default Form;
