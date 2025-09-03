export interface User {
  name: string;
  username: string;
  id?: number;
  roles?: string[];
  password?: string;
  token?: string;
}

export interface Role {
  name: string;
  description: string;
  id?: number;
}
