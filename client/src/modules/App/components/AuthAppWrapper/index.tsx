import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';
import useRequestApi, { IRequestData } from 'utils/http';
import styles from './styles.module.scss';

interface IAuthenticateUser extends IRequestData {
  data: {
    authenticate: boolean;
  };
  errors: string;
}

const AuthAppWrapper: React.FC = ({ children }) => {
  const { called, loading, requestApi, data, errors } = useRequestApi() as IAuthenticateUser;

  useEffect(() => {
    requestApi('api/user/authenticate');
  }, []);

  const loadingDone = () => {
    if (data && data.authenticate) return children;
    if (errors) return <Redirect to="/user/login" />;
  };

  return (
    <>
      {called && loading ? (
        <div className={styles.centerLoading}>
          <PulseLoader sizeUnit={'px'} size={25} color="#3b7dd8" loading={loading} />
        </div>
      ) : (
        loadingDone()
      )}
    </>
  );
};

export default AuthAppWrapper;
