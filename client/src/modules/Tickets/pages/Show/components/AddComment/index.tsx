import React, { useEffect } from 'react';
import useForm from 'react-hook-form';
import useRequestApi, { IRequestData } from 'utils/http';
import { Button, Form } from 'modules/Form';

type addCommentType = {
  message: string;
};

interface IAddComment {
  ticketId: string;
  refetchTicket: () => void;
}

const AddComment: React.FC<IAddComment> = ({ ticketId, refetchTicket }) => {
  const { register, handleSubmit } = useForm<addCommentType>();
  const { loading, requestApi, data } = useRequestApi() as any;

  const onSubmit = ({ message }: addCommentType) => {
    requestApi(`api/ticket/edit/${ticketId}`, 'PATCH', {
      comment: {
        message,
      },
    });
  };

  useEffect(() => {
    data && refetchTicket();
  }, [data]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <article className="media">
        <div className="media-content">
          <div className="field">
            <p className="control">
              <textarea
                // ref={register({
                //   required: true,
                //   maxLength: 1000,
                // })}
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

export default AddComment;
