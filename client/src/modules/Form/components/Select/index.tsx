import React from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';

export interface SelectProps {
  isMulti?: boolean;
  options: Array<{ value: string; label: string }>;
  register: any;
  name: string;
  label: string;
  isHorizontal?: boolean;
}

const Select: React.FC<SelectProps> = ({
  isMulti,
  options,
  label,
  name,
  register,
  isHorizontal,
}) => {
  return (
    <div className={cx('field', isHorizontal && 'is-horizontal')}>
      <label className={cx(styles.label, 'label', isHorizontal && 'field-label')}>{label}</label>
      <div className={cx('control', isHorizontal ? 'field-body' : undefined)}>
        <div className={cx(styles.select, 'select', isMulti && 'is-multiple', 'is-fullwidth')}>
          <select className={styles.select} name={name} ref={register}>
            {options.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Select;
