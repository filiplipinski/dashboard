import React, { useEffect } from 'react';
import useForm from 'react-hook-form';
import useRequestApi from 'utils/http';
import TicketSettings from './TicketSettings';
import { Group } from 'modules/Groups/models';
import { Button, Form } from 'modules/Form';

interface IEditTicketForm {
  ticketId: string;
  group: Group;
  refetchTicket: () => void;
}

const EditTicketForm: React.FC<IEditTicketForm> = ({ ticketId, refetchTicket, group }) => {
  const { register, handleSubmit, setValue, errors } = useForm();
  const { loading, requestApi, data } = useRequestApi() as any;

  // const onSubmit = (editTicketData: addCommentType) => {
  const onSubmit = editTicketData => {
    const { message } = editTicketData;

    // TODO:  naprawic typ edditTicketData
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
      <TicketSettings group={group} register={register} setValue={setValue} errors={errors} />
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
