import React from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';

export interface ErrorProps {
  isHorizontal?: boolean;
}

const Error: React.SFC<ErrorProps> = ({ children, isHorizontal }) => {
  return (
    <>
      {isHorizontal ? (
        <div className={cx('field', isHorizontal && 'is-horizontal')}>
          <div className="field-label">{/* left empty for spacing */}</div>
          <div className="field-body">
            <p className={cx(styles.error, 'has-text-danger')}>{children}</p>
          </div>
        </div>
      ) : (
        <p className={cx(styles.error, 'has-text-danger')}>{children}</p>
      )}
    </>
  );
};

export default Error;
