import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import Select from 'react-select';
import Creatable from 'react-select/creatable';
import styles from './styles.module.scss';

export interface SelectFieldProps {
  isMulti?: boolean;
  options?: Array<{ value: string; label: string }>;
  register: any;
  name: string;
  label: string;
  isHorizontal?: boolean;
  isCreatable?: boolean;
  setValue: any;
  errors: any;
}

const SelectField: React.FC<SelectFieldProps> = ({
  isCreatable,
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
    if (isCreatable) setValue(name, selectedOption ? selectedOption.map(v => v.value) : []);
    else setValue(name, selectedOption.value);

    setReactSelect({ selectedOption });
  };

  useEffect(() => {
    register({ name });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TODO: naprawic inlinenowy blad z p;
  return (
    <div className={cx('field', isHorizontal && 'is-horizontal')}>
      <label className={cx(styles.label, 'label', isHorizontal && 'field-label')}>{label}</label>
      <div className={cx(styles.columnFlex, 'control', isHorizontal ? 'field-body' : undefined)}>
        {isCreatable ? (
          <Creatable
            name={name}
            components={{ DropdownIndicator: false }}
            className={styles.select}
            placeholder="Dodaj..."
            value={values.selectedOption}
            onChange={handleMultiChange}
            noOptionsMessage={() => null}
            formatCreateLabel={value => `Dodaj "${value}"`}
            isMulti={true}
          ></Creatable>
        ) : (
          <Select
            name={name}
            options={options}
            className={styles.select}
            placeholder="Wybierz..."
            value={values.selectedOption}
            onChange={handleMultiChange}
            isMulti={isMulti}
          />
        )}
        {errors[name] && errors[name].type === 'required' && (
          <p className="help is-danger is-block">Pole jest wymagane.</p>
        )}
      </div>
    </div>
  );
};

export default SelectField;
