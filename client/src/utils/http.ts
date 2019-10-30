import React, { useState } from "react";
import config from "config";

const { API_URL } = config.endpoints;

export interface IRequestData {
  called: boolean;
  loading: boolean;
  requestApi: (
    endpoint: string,
    method: string,
    data?: any | undefined,
    options?: Object
  ) => {};
  data: object | null;
  errors: object | null;
}

type RequestOptions = {
  Authorization: any;
};

const useRequestApi = () => {
  const [data, setData] = useState(null);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [called, setCalled] = useState(false);

  const createUrl = (endpoint: string) => {
    if (endpoint.charAt(0) === "/") return `${API_URL}${endpoint.substr(1)}`;
    else return `${API_URL}${endpoint}`;
  };

  const requestApi: any = (
    endpoint,
    method,
    data = undefined,
    options = {}
  ) => {
    setCalled(true);
    setLoading(true);

    const URL = createUrl(endpoint);
    const { Authorization, ...opts } = options || ({} as RequestOptions);

    const request = {
      method,
      body: data ? JSON.stringify(data) : undefined,
      headers: {
        "Content-Type": "application/json",
        Authorization
      }
    };

    fetch(URL, request)
      .then(res => {
        if (!res.ok) {
          throw res.json();
        }
        return res;
      })
      .then(data => data.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        err.then(data => setErrors(data));
        setLoading(false);
      });
  };

  return {
    called,
    loading,
    requestApi,
    data,
    errors
  } as IRequestData;
};

export default useRequestApi;
