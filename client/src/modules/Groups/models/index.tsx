import { User } from 'modules/User/models';

export type Group = {
  _id: string;
  name: string;
  members: Array<User>;
  createdAt: Date;
};
