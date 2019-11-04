import React from 'react';
import cx from 'classnames';
import { CommentType } from 'modules/Tickets/types';
import styles from './styles.module.scss';

export interface CommentProps {
  comment: CommentType;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const { message, postedBy, createdAt } = comment;
  const createdAtBetterDate = new Date(createdAt).toLocaleString();

  return (
    <article className={cx(styles.comment, 'media')}>
      <div className="media-content">
        <div className="content">
          <p>
            <strong>{postedBy && postedBy.userName}</strong> <small>{createdAtBetterDate}</small>
            <br />
            {message}
          </p>
        </div>
      </div>
    </article>
  );
};

export default Comment;
