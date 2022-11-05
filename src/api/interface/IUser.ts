export interface IUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  admin?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
