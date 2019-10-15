import config from "config";

const { API_URL } = config.endpoints;

type RequestOptions = {
  withoutAuth?: boolean;
  Authorization: any;
};

const createUrl = (endpoint: string) => {
  if (endpoint.charAt(0) === "/") return `${API_URL}${endpoint.substr(1)}`;
  else return `${API_URL}${endpoint}`;
};

const requestApi = async (
  endpoint: string,
  method = "GET",
  data?: object,
  options?: RequestOptions
) => {
  const URL = createUrl(endpoint);
  const { withoutAuth, Authorization, ...opts } =
    options || ({} as RequestOptions);

  const request = {
    method,
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      "Content-Type": "application/json",
      Authorization
    }
  };

  const response = await fetch(URL, request)
    .then(res => {
      if (!res.ok) {
        // throw Error(res.statusText);
        throw res.json();
      }
      return res;
    })
    .then(data => data.json())
    .catch(err => {
      return err;
    });

  return response;
};

export default requestApi;
