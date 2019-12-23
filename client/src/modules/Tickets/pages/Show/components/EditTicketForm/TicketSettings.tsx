import React, { useMemo } from 'react';
import styles from './styles.module.scss';

import { Group } from 'modules/Groups/models';
import { SelectField, FileUpload } from 'modules/Form';

export interface TicketSettingsProps {
  group: Group;
  initialSelectValues: any;
  register: any;
  errors: any;
  setValue: any;
  watch: any;
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

const progressOptions = [
  { value: '0', label: '0%' },
  { value: '10', label: '10%' },
  { value: '20', label: '20%' },
  { value: '30', label: '30%' },
  { value: '40', label: '40%' },
  { value: '50', label: '50%' },
  { value: '60', label: '60%' },
  { value: '70', label: '70%' },
  { value: '80', label: '80%' },
  { value: '90', label: '90%' },
  { value: '100', label: '100%' },
];

const TicketSettings: React.FC<TicketSettingsProps> = ({
  group,
  register,
  errors,
  setValue,
  initialSelectValues,
  watch,
}) => {
  const { state, priority, progress, assignedTo } = initialSelectValues;
  const fileFieldValue = watch('file');

  const groupMembersOptions = useMemo(() => {
    return group.members.map(member => ({ value: member._id, label: member.userName }));
  }, [group]);

  const assignedUserInitialValue = assignedTo
    ? {
        label: initialSelectValues.assignedTo.userName,
        value: initialSelectValues.assignedTo._id,
      }
    : null;

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
          initialValue={priorityOptions.find(o => o.value === priority)}
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
          initialValue={stateOptions.find(o => o.value === state)}
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
          initialValue={assignedUserInitialValue}
        />
      </div>
      <div className={styles.select}>
        <SelectField
          name="progress"
          label="Progres"
          options={progressOptions}
          register={register}
          setValue={setValue}
          errors={errors}
          initialValue={progressOptions.find(o => o.value === String(progress))}
        />
      </div>
      <FileUpload name="file" label="Załącznik" register={register} value={fileFieldValue} />
    </div>
  );
};

export default TicketSettings;
