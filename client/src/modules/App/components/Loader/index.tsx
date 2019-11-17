import React from 'react';
import { IRequestData } from 'utils/http';
import BarLoader from 'react-spinners/BarLoader';
import styles from './styles.module.scss';

export interface LoaderProps {
  async: IRequestData;
  children: (props: any) => React.ReactNode;
}

// TODO: gdy request sie nie powiedzie, a loadig skonczy to powininen zwrocic zwrote ze blad ogolny
const Loader: React.SFC<LoaderProps> = ({ children, async }) => {
  const { called, loading, data, errors } = async;

  return (
    <div>
      {called && loading ? (
        <div className={styles.loaderWrapper}>
          <div className={styles.loaderSpace}>
            <BarLoader widthUnit="%" width={100} height={8} color="#3b7dd8" loading={loading} />
          </div>
          <div className={styles.loaderSpace}>
            <BarLoader widthUnit="%" width={100} height={8} color="#3b7dd8" loading={loading} />
          </div>
          <div className={styles.loaderSpace}>
            <BarLoader widthUnit="%" width={100} height={8} color="#3b7dd8" loading={loading} />
          </div>
        </div>
      ) : data ? (
        children({ data, errors })
      ) : (
        <p className={styles.notFound}>Nie znaleziono takiej strony</p>
      )}
    </div>
  );
};

export default Loader;
