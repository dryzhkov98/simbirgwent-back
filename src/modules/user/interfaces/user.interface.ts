export interface IUser {
  firstName?: string;
  lastName?: string;
  nickname: string;
  password: string;
  age: number;
  email: string;
  salt: Buffer;
}
