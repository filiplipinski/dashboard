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
  refetch: () => void;
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
  const [requestData, setRequestData] = useState(null as any);

  const createUrl = (endpoint: string) => {
    if (endpoint.charAt(0) === '/') return `${API_URL}${endpoint.substr(1)}`;
    else return `${API_URL}${endpoint}`;
  };

  const refetch = () => {
    if (requestData) {
      const { endpoint, method, data, options } = requestData;
      requestApi(endpoint, method, data, options);
    }
  };

  const requestApi: any = (endpoint, method = 'GET', data = undefined, options = {}) => {
    setCalled(true);
    setLoading(true);
    setRequestData({
      endpoint,
      method: method ? method : 'GET',
      data: data ? data : undefined,
      options: options ? options : {},
    });

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
        if (err.statusText === 'Unauthorized') {
          Cookies.remove('AUTHORIZATION_JWT');
          history.push('/user/login');
        } else if (typeof err.json === 'function') err.json().then(errMsg => setErrors(errMsg));
        else setErrors(err);
        setLoading(false);
      });
  };

  return {
    called,
    loading,
    requestApi,
    refetch,
    data,
    errors,
  } as IRequestData;
};

export default useRequestApi;
