import React from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';

export interface TextAreaFieldProps {
  register: any;
  name: string;
  label: string;
  placeholder?: string;
  isHorizontal?: boolean;
}

const TextAreaField: React.SFC<TextAreaFieldProps> = ({
  register,
  label,
  name,
  placeholder,
  isHorizontal,
  ...rest
}) => {
  return (
    <div className={cx('field', isHorizontal && 'is-horizontal')}>
      <label className={cx(styles.label, 'label', isHorizontal && 'field-label')}>{label}</label>
      <div className={cx('control', isHorizontal ? 'field-body' : undefined)}>
        <textarea
          className="textarea"
          name={name}
          ref={register}
          placeholder={placeholder}
          {...rest}
        ></textarea>
      </div>
    </div>
  );
};

export default TextAreaField;
