import React from 'react';
import cx from 'classnames';

export interface ButtonProps {
  type: 'button' | 'submit';
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  isHorizontal?: boolean;
}

const Button: React.SFC<ButtonProps> = ({
  type,
  children,
  onClick,
  loading,
  disabled,
  isHorizontal,
  ...styles
}) => {
  const formButton = (
    <div className={cx('field', isHorizontal && 'is-horizontal')}>
      <div className="field-label">{/* left empty for spacing */}</div>
      {/* class 'control' needed for form */}
      <div className={cx('control', isHorizontal && 'field-body')}>
        <button
          className={cx(styles, loading && 'is-loading', 'button is-link')}
          disabled={disabled ? disabled : false}
        >
          {children}
        </button>
      </div>
    </div>
  );

  const linkButton = (
    <a className={cx(styles, loading && 'is-loading', 'button')} onClick={onClick}>
      {children}
    </a>
  );

  return <>{type === 'submit' ? formButton : linkButton}</>;
};

export default Button;
