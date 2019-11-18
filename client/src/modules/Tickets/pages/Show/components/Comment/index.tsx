import React from 'react';
import cx from 'classnames';
import { CommentType } from 'modules/Tickets/models';
import findTicketChanges from '../../utils/findTicketChanges';
import styles from './styles.module.scss';

export interface CommentProps {
  comment: CommentType;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const { message, postedBy, createdAt } = comment;
  const createdAtBetterDate = new Date(createdAt).toLocaleString();

  const changes = findTicketChanges(comment.changes);

  return (
    <article className={cx(styles.comment, 'media')}>
      <div className="media-content">
        <div className="content">
          <strong>{postedBy && postedBy.userName}</strong> <small>{createdAtBetterDate}</small>
          <br />
          {changes.map((change, index) => (
            <div key={index} className={styles.changes}>
              <p className="has-text-grey-dark is-size-7 is-italic">{`• ${change}`}</p>
            </div>
          ))}
          <p className={styles.message}>{message}</p>
        </div>
      </div>
    </article>
  );
};

export default Comment;
