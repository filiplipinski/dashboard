import { User } from 'modules/User/models';
import { Group } from 'modules/Groups/models';

enum TicketState {
  cancelled = 'cancelled',
  inRealization = 'inRealization',
  finalized = 'finalized',
  waiting = 'waiting',
  todo = 'todo',
}

enum TicketPriority {
  low = 'low',
  normal = 'normal',
  high = 'high',
}

export type Ticket = {
  _id: string;
  group: Group;
  title: string;
  description: string;
  state: TicketState;
  assignedTo: User;
  createdAt: string;
  lastModified: string;
  priority: TicketPriority;
  progress: number;
  comments: Array<CommentType>;
};

export type CommentType = {
  message: string;
  createdAt: Date;
  postedBy: User;
};

export interface IAddTicket {
  title: string;
  state: TicketState;
  assignedTo: User;
  priority: TicketPriority;
  description: string;
}
