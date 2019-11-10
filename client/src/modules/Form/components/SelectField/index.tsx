import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import Select from 'react-select';
import styles from './styles.module.scss';

export interface SelectFieldProps {
  isMulti?: boolean;
  options: Array<{ value: string; label: string }>;
  register: any;
  name: string;
  label: string;
  isHorizontal?: boolean;
  setValue: any;
  errors: any;
}

const SelectField: React.FC<SelectFieldProps> = ({
  isMulti,
  options,
  errors,
  label,
  name,
  register,
  setValue,
  isHorizontal,
}) => {
  const [values, setReactSelect] = useState({
    selectedOption: [],
  });

  const handleMultiChange = selectedOption => {
    setValue(name, selectedOption.value);
    setReactSelect({ selectedOption });
  };

  useEffect(() => {
    register({ name });
  }, []);

  return (
    <div className={cx('field', isHorizontal && 'is-horizontal')}>
      <label className={cx(styles.label, 'label', isHorizontal && 'field-label')}>{label}</label>
      <div className={cx('control', isHorizontal ? 'field-body' : undefined)}>
        <Select
          name={name}
          options={options}
          className={styles.select}
          placeholder="Wybierz..."
          value={values.selectedOption}
          onChange={handleMultiChange}
          isMulti={isMulti}
        />
      </div>
      {errors[name] && errors[name].type === 'required' && (
        <p className="help is-danger">Pole jest wymagane.</p>
      )}
    </div>
  );
};

export default SelectField;
