/* eslint-disable no-useless-constructor */

import { IUser } from '../../core/entities/user'
import { IuserRepository } from '../../core/repositories/userRepository'
import { EmailProvider } from '../../providers/EmailProvider'

export default class createUserCase {
  constructor (
    private UserRepository: IuserRepository,
    private EmailProvider: EmailProvider
  ) {}

  async execute (data: IUser) {
    const user = await this.UserRepository.createUser(data)

    this.EmailProvider.sendMail({
      from: {
        name: 'Luiz felipe',
        email: 'luizfelipejs.svp@gmail.com'
      },
      to: {
        email: user.email,
        name: user.name
      },
      subject: 'seja bem vindo a plataforma',
      body: 'você agora faz parte da nossa lista de emails'
    })

    return user
  }
}
