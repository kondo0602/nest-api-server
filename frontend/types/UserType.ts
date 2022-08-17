export type IGetUserResponse = {
  user: IUser[];
};

export type IUser = {
  id: string;
  name: string;
  email: string;
  statusId: string;
};
