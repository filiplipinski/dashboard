import React from "react";

type InputType = "text" | "email" | "password";
type Icons = "user" | "envelope" | "lock";

export interface TextFieldProps {
  register: any;
  errors: any;
  label: string;
  name: string;
  type: InputType;
  placeholder?: string;
  icon?: Icons;
}

const TextField: React.SFC<TextFieldProps> = ({
  register,
  errors,
  label,
  name,
  type,
  placeholder,
  icon
}) => {
  const findErrorCause = (error: any) => {
    if (error.type === "required") return "Pole jest wymagane.";
    else if (error.type === "validate") return "Hasła muszą być takie same.";
    else return "Nieprawidłowe dane.";
  };

  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control has-icons-left">
        <input
          name={name}
          ref={register}
          className="input"
          type={type}
          placeholder={placeholder}
        />
        <span className="icon is-small is-left">
          <i className={`fas fa-${icon}`}></i>
        </span>
      </div>
      {errors[name] && (
        <p className="help is-danger">{findErrorCause(errors[name])}</p>
      )}
    </div>
  );
};

export default TextField;
