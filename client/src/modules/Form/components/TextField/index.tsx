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
  isHorizontal?: boolean;
}

const TextField: React.SFC<TextFieldProps> = ({
  register,
  errors,
  label,
  name,
  type,
  placeholder,
  icon,
  isHorizontal,
  ...rest
}) => {
  const findErrorCause = (error: any) => {
    if (error.type === 'required') return 'Pole jest wymagane.';
    else if (error.type === 'validate') return 'Hasła muszą być takie same.';
    else if (error.type === 'minLength') return 'Minimalna ilość znaków to 5.';
    else return 'Nieprawidłowe dane.';
  };

  return (
    <div className={cx(styles.field, 'field', isHorizontal && 'is-horizontal')}>
      <label className={cx(styles.label, 'label', isHorizontal && 'field-label')}>{label}</label>
      <div
        className={cx(styles.columnFlex, 'control', icon && 'has-icons-left', isHorizontal && 'field-body')}
      >
        <input
          name={name}
          ref={register}
          className={cx(styles.input, 'input')}
          type={type}
          placeholder={placeholder}
          {...rest}
        />
        {icon && (
          <span className="icon is-small is-left">
            <i className={`fas fa-${icon}`}></i>
          </span>
        )}
        {errors[name] && <p className="help is-danger">{findErrorCause(errors[name])}</p>}
      </div>
    </div>
  );
};

export default TextField;
