export interface User {
  username: string;
  password?: string;
  email: string;
  birthday?: string;
  roles?: Array<string>;
  token?: string;
  id?: string;
}