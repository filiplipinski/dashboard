import { User } from 'modules/User/models';
import { Group } from 'modules/Groups/models';

export enum TicketState {
  cancelled = 'cancelled',
  inRealization = 'inRealization',
  finalized = 'finalized',
  waiting = 'waiting',
  todo = 'todo',
}

export enum TicketPriority {
  low = 'low',
  normal = 'normal',
  high = 'high',
}

export type FileType = {
  _id: string;
  originalName: string;
};

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
  uploadedFiles?: Array<FileType>;
};

export type CommentType = {
  message: string;
  createdAt: Date;
  postedBy: User;
  changes?: {
    state?: TicketState;
    assignedTo: User;
    priority?: TicketPriority;
    progress?: number;
    uploadedFiles?: FileType;
  };
};

export interface IAddTicket {
  title: string;
  state: TicketState;
  assignedTo: User;
  priority: TicketPriority;
  description: string;
}
