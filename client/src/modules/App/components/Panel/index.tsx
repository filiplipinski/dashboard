import React from 'react';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import styles from './styles.module.scss';

export interface PanelProps {
  title: string;
  tooltipText?: string;
}

const Panel: React.FC<PanelProps> = ({ children, title, tooltipText }) => {
  const isMobile = window.screen.width <= 768;

  return (
    <>
      <h4 className={cx(styles.title, 'title is-5')}>
        {title}

        {tooltipText && (
          <span className={cx('has-tooltip-left', isMobile && 'has-tooltip-multiline')} data-tooltip={tooltipText}>
            <FontAwesomeIcon icon={faQuestionCircle} className={styles.icon} />
          </span>
        )}
      </h4>

      <div className={styles.wrapper}>{children}</div>
    </>
  );
};

export default Panel;
