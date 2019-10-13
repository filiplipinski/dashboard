import Cookies from "js-cookie";

interface IToken {
  token: string;
  expirationDate: Date;
}
export const setToken = (tokenData: IToken) => {
  const { token, expirationDate } = tokenData;
  const date = new Date(expirationDate);

  Cookies.set("AUTHORIZATION_JWT", token, { expires: date });
};
