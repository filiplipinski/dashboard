export interface ILoginUser {
  userName: string;
  password: string;
}

export interface IRegisterUser extends ILoginUser {
  emailAddress: string;
}

export type User = {
  _id: string;
  userName: string;
};
