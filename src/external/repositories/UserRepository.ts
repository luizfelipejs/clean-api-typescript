
import { EntityRepository, Repository } from 'typeorm'
import { IUser } from '../../core/entities/user'
import { IuserRepository } from '../../core/repositories/userRepository'
import { User } from '../models/user'

@EntityRepository(User)
export class UserRepository extends Repository<User> implements IuserRepository {
  async listUsers (): Promise<IUser[]> {
    return this.find()
  }

  async createUser (data: IUser): Promise<IUser> {
    const user = this.create({
      name: data.name,
      email: data.email
    })

    return await this.save(user)
  }

  async findByEmail (email: string): Promise<IUser> {
    const user = await this.findOne({ email })

    if (!user) {
      throw new Error('Usuario não encontrado')
    }

    return user
  }
}
