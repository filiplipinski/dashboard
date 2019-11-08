import React from 'react';
import styles from './styles.module.scss';

export interface FormProps {
  onSubmit: any;
  isHorizontal?: boolean;
}

const Form: React.SFC<FormProps> = ({ children, onSubmit, isHorizontal }) => {
  const childrenWithAdditionalProp = () => {
    return React.Children.map(children, (child: any) =>
      React.cloneElement(child, { isHorizontal: true }),
    );
  };

  return (
    <form onSubmit={onSubmit} className={isHorizontal ? styles.horizontal : undefined}>
      {isHorizontal ? childrenWithAdditionalProp() : children}
    </form>
  );
};

export default Form;
