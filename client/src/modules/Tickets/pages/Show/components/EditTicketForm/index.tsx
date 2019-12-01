import React, { useEffect } from 'react';
import useForm from 'react-hook-form';
import useRequestApi from 'utils/http';
import TicketSettings from './TicketSettings';
import { Group } from 'modules/Groups/models';
import { TicketPriority, TicketState } from 'modules/Tickets/models';
import { Button, Form } from 'modules/Form';

interface IEditTicketForm {
  ticketId: string;
  group: Group;
  refetchTicket: () => void;
  initialSelectValues: any;
}

type FormEditTicketTypes = {
  message: string;
  assignedTo: string;
  priority: TicketPriority;
  state: TicketState;
};

const EditTicketForm: React.FC<IEditTicketForm> = ({ ticketId, refetchTicket, group, initialSelectValues }) => {
  const { register, handleSubmit, setValue, errors } = useForm<FormEditTicketTypes>();
  const { loading, requestApi, data } = useRequestApi();

  const onSubmit = (editTicketData: FormEditTicketTypes) => {
    const { message } = editTicketData;

    requestApi(`api/ticket/edit/${ticketId}`, 'PATCH', {
      comment: {
        message,
      },
      ...editTicketData,
    });
  };

  useEffect(() => {
    data && refetchTicket();
  }, [data]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <TicketSettings
        group={group}
        initialSelectValues={initialSelectValues}
        register={register}
        setValue={setValue}
        errors={errors}
      />
      <article className="media">
        <div className="media-content">
          <div className="field">
            <p className="control">
              <textarea
                ref={register({
                  maxLength: 1000,
                })}
                className="textarea"
                name="message"
                placeholder="Dodaj komentarz..."
              ></textarea>
            </p>
          </div>
          <nav className="level">
            <div className="level-left">
              <div className="level-item">
                <Button type="submit" loading={loading} disabled={loading}>
                  Edytuj zadanie
                </Button>
              </div>
            </div>
          </nav>
        </div>
      </article>
    </Form>
  );
};

export default EditTicketForm;
