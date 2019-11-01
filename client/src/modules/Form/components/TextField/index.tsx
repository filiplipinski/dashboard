import React from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';

type InputType = 'text' | 'email' | 'password';
type Icons = 'user' | 'envelope' | 'lock';

export interface TextFieldProps {
  register: any;
  errors: any;
  label: string;
  name: string;
  type: InputType;
  placeholder?: string;
  icon?: Icons;
  onChange?: (value: any) => void;
}

const TextField: React.SFC<TextFieldProps> = ({
  register,
  errors,
  label,
  name,
  type,
  placeholder,
  icon,
  ...rest
}) => {
  const findErrorCause = (error: any) => {
    if (error.type === 'required') return 'Pole jest wymagane.';
    else if (error.type === 'validate') return 'Hasła muszą być takie same.';
    else return 'Nieprawidłowe dane.';
  };

  return (
    <div className={cx(styles.field, 'field')}>
      <label className={cx(styles.label, 'label')}>{label}</label>
      <div className="control has-icons-left">
        <input
          name={name}
          ref={register}
          className={cx(styles.input, 'input')}
          type={type}
          placeholder={placeholder}
          {...rest}
        />
        <span className="icon is-small is-left">
          <i className={`fas fa-${icon}`}></i>
        </span>
      </div>
      {errors[name] && <p className="help is-danger">{findErrorCause(errors[name])}</p>}
    </div>
  );
};

export default TextField;
