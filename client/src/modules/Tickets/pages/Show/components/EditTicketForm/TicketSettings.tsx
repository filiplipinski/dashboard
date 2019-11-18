import React, { useMemo } from 'react';
import styles from './styles.module.scss';

import { Group } from 'modules/Groups/models';
import { SelectField } from 'modules/Form';

export interface TicketSettingsProps {
  group: Group;
  register: any;
  errors: any;
  setValue: any;
}

const stateOptions = [
  { value: 'todo', label: 'Do wykonania' },
  { value: 'waiting', label: 'Oczekujące' },
  { value: 'finalized', label: 'Zakończone' },
  { value: 'inRealization', label: 'W realizacji' },
  { value: 'cancelled', label: 'Anulowane' },
];

const priorityOptions = [
  { value: 'normal', label: 'Normalny' },
  { value: 'low', label: 'Niski' },
  { value: 'high', label: 'Wysoki' },
];
// TODO: zrobic zmiane progresu

const TicketSettings: React.FC<TicketSettingsProps> = ({ group, register, errors, setValue }) => {
  const groupMembersOptions = useMemo(() => {
    return group.members.map(member => ({ value: member._id, label: member.userName }));
  }, [group]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.select}>
        <SelectField
          name="priority"
          label="Priorytet"
          options={priorityOptions}
          register={register}
          setValue={setValue}
          errors={errors}
          isClearable
        />
      </div>
      <div className={styles.select}>
        <SelectField
          name="state"
          label="Stan"
          options={stateOptions}
          register={register}
          setValue={setValue}
          errors={errors}
          isClearable
        />
      </div>
      <div className={styles.select}>
        <SelectField
          name="assignedTo"
          label="Przypisane do"
          options={groupMembersOptions}
          register={register}
          setValue={setValue}
          errors={errors}
          isClearable
        />
      </div>
    </div>
  );
};

export default TicketSettings;
