import config from "config";

const { API_URL } = config.endpoints;

type RequestOptions = {
  withoutAuth?: boolean;
};

const requestApi = async (
  endpoint: string,
  method = "GET",
  data?: object,
  options?: RequestOptions
) => {
  // TODO: wstaw fixUrl, gdy brak / lub sa podwojne --> ma byc 1
  const URL = `${API_URL}${endpoint}`;
  const { withoutAuth, ...opts } = options || ({} as RequestOptions);

  if (withoutAuth) {
    const request = {
      method,
      body: data ? JSON.stringify(data) : undefined,
      headers: {
        "Content-Type": "application/json"
      }
    };

    const response = await fetch(URL, request)
      .then(res => {
        if (res.status === 200) return res.json();
        throw Error(`Error ${res.statusText}`);
      })
      // .then(data => data)
      .catch(err => {
        alert("Failed to fetch. Check console.");
        console.log(err);
      });

    return response;
  } else {
    //TODO: requesty z bearer tokenem
  }
};

export default requestApi;
