import React, { useEffect } from 'react';
import useForm from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import Page from 'modules/App/components/Page';
import Panel from 'modules/App/components/Panel';
import { IAddTicket, Ticket } from 'modules/Tickets/models';
import { TextField, Button, Form, Select, TextAreaField } from 'modules/Form';
import useRequestApi, { IRequestData } from 'utils/http';
import Error from 'modules/App/components/Error';

interface IAddTicketResponse extends IRequestData {
  data: {
    success: string;
    ticket: Ticket;
  };
  errors: {
    error: string;
  };
}

const stateOptions = [
  { value: 'todo', label: 'Do zrobienia' },
  { value: 'waiting', label: 'Oczekujące' },
];

const priorityOptions = [
  { value: 'normal', label: 'Normalny' },
  { value: 'low', label: 'Niski' },
  { value: 'high', label: 'Wysoki' },
];

const AddTicket: React.FC = () => {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm<IAddTicket>();
  const {
    loading: loadingRequest,
    requestApi,
    data,
    errors: errorsRequest,
  } = useRequestApi() as IAddTicketResponse;

  const onSubmit = (addTicketData: IAddTicket) => {
    requestApi('api/ticket/add', 'POST', addTicketData);
  };

  useEffect(() => {
    if (data && data.success) {
      const {
        ticket: { _id },
      } = data;
      history.push(`/tickets/show/${_id}`);
    }
  }, [data]);

  return (
    <Page>
      <Panel title="Dodaj zadanie">
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
          <Select
            name="priority"
            label="Priorytet"
            options={priorityOptions}
            register={register({
              required: true,
            })}
          />
          <Select
            name="state"
            label="Stan"
            options={stateOptions}
            register={register({
              required: true,
            })}
          />
          {/* TODO: tez select bedzie, ale pierw wybrac grupe, potem lsita ludzi w grupie*/}
          <TextField
            name="assignedTo"
            register={register({
              maxLength: 255,
            })}
            type="text"
            label="Przypisane do"
            errors={errors}
          />
          <TextAreaField
            name="description"
            register={register({
              required: true,
              maxLength: 10000,
              minLength: 5,
            })}
            label="Opis"
          />
          <Error>{errorsRequest && 'Wystąpił błąd podczas dodawania nowego zadania'}</Error>
          <Button type="submit" loading={loadingRequest} disabled={loadingRequest}>
            Utwórz zadanie
          </Button>
        </Form>
      </Panel>
    </Page>
  );
};

export default AddTicket;
