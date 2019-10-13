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
      if (res.status === 200) return res.json();
      // if (res.status === 400) {
      //   res.json().then(err => {
      //     throw Error(`Error ${err.error}`);
      //   });
      // }
      else throw Error(`Error ${res.statusText}`);
    })
    .catch(err => {
      // alert("Failed to fetch. Check console.");
      console.log(err);
    });

  return response;
};

export default requestApi;
