import { IUser } from "../entities/user";

export interface IuserRepository {
  createUser(data: IUser): Promise<IUser>;
  findByEmail(email: string): Promise<IUser>; 
}