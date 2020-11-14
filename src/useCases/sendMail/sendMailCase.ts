/* eslint-disable no-useless-constructor */
import { IuserRepository } from '../../core/repositories/userRepository'
import { EmailProvider, Message } from '../../providers/EmailProvider'

export default class SendMailCase {
  constructor (
    private EmailProvider: EmailProvider,
    private UserRepository: IuserRepository
  ) {}

  async execute (message: Message) {
    const users = await this.UserRepository.listUsers()

    console.log(users)

    const sendMailPromisses = users.map(async (user) => {
      const messageSend = { ...message, to: { name: user.name, email: user.email } }
      console.log(messageSend)
      return await this.EmailProvider.sendMail(messageSend)
    }
    )

    await Promise.all(sendMailPromisses)
  }
}
