import React from 'react';
import Select from 'react-select';
import cx from 'classnames';

import selectStyles from 'modules/Form/components/SelectField/styles.module.scss';
import formWrapperStyles from 'modules/Form/components/Form/styles.module.scss';

type Value = {
  value: string;
  label: string;
};
interface ClearSelectProps {
  options: Array<{ value: string; label: string }>;
  value: Value;
  onChange: (selectValue: Value) => void;
}

const ClearSelect: React.SFC<ClearSelectProps> = ({ options, value, onChange }) => {
  return (
    <div className={formWrapperStyles.horizontal}>
      <div className={cx('field', 'is-horizontal')}>
        <label className={cx(selectStyles.label, 'label', 'field-label')}>Wybierz grupe</label>
        <div className={cx(selectStyles.columnFlex, 'control', 'field-body')}>
          <Select
            options={options}
            placeholder="Wybierz..."
            className={selectStyles.select}
            value={value}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ClearSelect;
