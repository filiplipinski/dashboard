import React, { useState } from 'react';
import config from 'config';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';

const { API_URL } = config.endpoints;

export interface IRequestData {
  called: boolean;
  loading: boolean;
  requestApi: (
    endpoint: string,
    method?: string,
    data?: any | undefined,
    options?: RequestOptions,
  ) => {};
  data: object | null;
  errors: object | null;
}

type RequestOptions = {
  Authorization?: any;
  disableJwtAuth?: boolean;
};

const useRequestApi = () => {
  const jwtToken = Cookies.get('AUTHORIZATION_JWT');
  const history = useHistory();
  const [data, setData] = useState(null);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [called, setCalled] = useState(false);

  const createUrl = (endpoint: string) => {
    if (endpoint.charAt(0) === '/') return `${API_URL}${endpoint.substr(1)}`;
    else return `${API_URL}${endpoint}`;
  };

  const requestApi: any = (endpoint, method = 'GET', data = undefined, options = {}) => {
    setCalled(true);
    setLoading(true);

    const URL = createUrl(endpoint);
    const { Authorization, disableJwtAuth, ...opts } = options || ({} as RequestOptions);

    const request = {
      method,
      body: data ? JSON.stringify(data) : undefined,
      headers: {
        'Content-Type': 'application/json',
        Authorization: disableJwtAuth ? Authorization : `Bearer ${jwtToken}`,
      },
    };

    fetch(URL, request)
      .then(res => {
        if (!res.ok) {
          throw res;
        }
        return res;
      })
      .then(data => data.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        if (err.statusText === 'Unauthorized') {
          Cookies.remove('AUTHORIZATION_JWT');
          history.push('/user/login');
        } else err.json().then(errMsg => setErrors(errMsg));

        setLoading(false);

        // if (typeof err.then === 'function')
        //   err.then(errMsg => {
        //     if (errMsg.hasOwnProperty('status') && errMsg.status === 'Unauthorized') {
        //       Cookies.remove('AUTHORIZATION_JWT');
        //       history.push('/user/login');
        //     } else setErrors(data);
        //   });
        // else if (err === 'Unauthorized') {
        //   console.log('redeirect');
        // } else setErrors(err);
        // setLoading(false);
      });
  };

  return {
    called,
    loading,
    requestApi,
    data,
    errors,
  } as IRequestData;
};

export default useRequestApi;
