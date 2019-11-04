export type Ticket = {
  _id: string;
  title: string;
  state: string;
  assignedTo: User;
  createdAt: string;
  lastModified: string;
  priority: string;
  progress: number;
  comments: Array<CommentType>;
};

export type CommentType = {
  message: string;
  createdAt: Date;
  postedBy: User;
};

export type User = {
  _id: string;
  userName: string;
};
