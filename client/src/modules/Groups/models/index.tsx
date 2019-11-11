import { User } from 'modules/User/models';

export type Group = {
  name: string;
  members: Array<User>;
};
