import React, { useEffect, useMemo } from 'react';
import useForm from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { IAddTicket, Ticket } from 'modules/Tickets/models';
import { Group } from 'modules/Groups/models';
import { TextField, Button, Form, SelectField, TextAreaField } from 'modules/Form';
import useRequestApi, { IRequestData } from 'utils/http';
import Error from 'modules/App/components/Error';

interface IAddTicketResponse extends IRequestData {
  data: {
    success: string;
    ticket: Ticket;
  };
  errors: string;
}

interface AddFormProps {
  group: Group;
}

const stateOptions = [{ value: 'todo', label: 'Do wykonania' }, { value: 'waiting', label: 'Oczekujące' }];

const priorityOptions = [
  { value: 'normal', label: 'Normalny' },
  { value: 'low', label: 'Niski' },
  { value: 'high', label: 'Wysoki' },
];

const AddForm: React.SFC<AddFormProps> = ({ group }) => {
  const history = useHistory();
  const { register, handleSubmit, errors, setValue } = useForm<IAddTicket>();
  const { loading: loadingRequest, requestApi, data, errors: errorsRequest } = useRequestApi() as IAddTicketResponse;

  const onSubmit = (addTicketData: IAddTicket) => {
    const preparedData = { ...addTicketData, group: group._id };
    requestApi('api/ticket/add', 'POST', preparedData);
  };

  const assignedToOptions = useMemo(() => {
    return group.members.map(member => ({ value: member._id, label: member.userName }));
  }, [group]);

  useEffect(() => {
    if (data && data.success) {
      const {
        ticket: { _id },
      } = data;
      history.push(`/tickets/show/${_id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Form isHorizontal onSubmit={handleSubmit(onSubmit)}>
      <TextField
        name="title"
        register={register({
          required: true,
          maxLength: 255,
          minLength: 5,
        })}
        type="text"
        label="Tytuł"
        errors={errors}
      />
      <SelectField
        name="priority"
        label="Priorytet"
        options={priorityOptions}
        register={register({
          required: true,
        })}
        setValue={setValue}
        errors={errors}
      />
      <SelectField
        name="state"
        label="Stan"
        options={stateOptions}
        register={register({
          required: true,
        })}
        setValue={setValue}
        errors={errors}
      />
      <SelectField
        name="assignedTo"
        label="Przypisane do"
        options={assignedToOptions}
        register={register}
        setValue={setValue}
        errors={errors}
        isClearable
      />
      <TextAreaField
        name="description"
        register={register({
          required: true,
          maxLength: 10000,
          minLength: 5,
        })}
        label="Opis"
        errors={errors}
      />
      <Error>{errorsRequest && 'Wystąpił błąd podczas dodawania nowego zadania'}</Error>
      <Button type="submit" loading={loadingRequest} disabled={loadingRequest}>
        Utwórz zadanie
      </Button>
    </Form>
  );
};

export default AddForm;
