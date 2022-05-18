export type UserType = {
  firstName: string;
  lastName: string;
  email: string;
  authToken: string;
};

export type UserStateType = {
  loading: boolean;
  user: UserType;
  error: string;
};
