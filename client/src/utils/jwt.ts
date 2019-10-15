import Cookies from "js-cookie";

interface IToken {
  token: string;
  expirationDate: Date;
}
export const setToken = (tokenData: IToken) => {
  const { token, expirationDate } = tokenData;
  const date = new Date(expirationDate);

  // i add timezone, cause Cookies dont see it
  const timeZoneSeconds = date.getTimezoneOffset() * -1 * 60;
  // *1000 cause convert to miliseconds
  const formattedDate = new Date(date.getTime() + timeZoneSeconds * 1000);

  Cookies.set("AUTHORIZATION_JWT", token, { expires: formattedDate });
};
