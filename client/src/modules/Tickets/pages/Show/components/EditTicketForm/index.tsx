import React, { useEffect } from 'react';
import useForm from 'react-hook-form';
import useRequestApi from 'utils/http';
import TicketSettings from './TicketSettings';
import { Group } from 'modules/Groups/models';
import { Button, Form } from 'modules/Form';

type addCommentType = {
  message: string;
};

interface IEditTicketForm {
  ticketId: string;
  group: Group;
  refetchTicket: () => void;
}

const EditTicketForm: React.FC<IEditTicketForm> = ({ ticketId, refetchTicket, group }) => {
  const { register, handleSubmit, setValue, errors } = useForm<addCommentType>();
  const { loading, requestApi, data } = useRequestApi() as any;

  // const onSubmit = (editTicketData: addCommentType) => {
  const onSubmit = (editTicketData: any) => {
    const { message } = editTicketData;
    // TODO: zrobic zmienianie settings przy edit ticket. naprawic typ
    console.log(editTicketData);
    // requestApi(`api/ticket/edit/${ticketId}`, 'PATCH', {
    //   comment: {
    //     message,
    //   },
    // });
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
