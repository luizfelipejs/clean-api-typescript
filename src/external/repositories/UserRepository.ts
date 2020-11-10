import { IUser } from "src/core/entities/user";
import { IuserRepository } from "src/core/repositories/userRepository";
import { EntityRepository, Repository } from "typeorm";
import { User } from "../models/user";

@EntityRepository(User)
export class UserRepository extends Repository<User> implements IuserRepository {
  async createUser(data: IUser): Promise<IUser> {
    const user = this.create({
      name: data.name,
      email: data.email
    })

    return await this.save(user)
  }
  async findByEmail(email: string): Promise<IUser> {
    const user = await this.findOne({ email });

    if (!user) {
      throw new Error('Usuario não encontrado')
    }

    return user 
  }
}