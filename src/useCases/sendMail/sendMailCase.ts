import { IuserRepository } from '../../core/repositories/userRepository'
import { EmailProvider, Message } from '../../providers/EmailProvider'
import TemplatesForEmails from '../templates'

export default class SendMailCase {
  private EmailProvider: EmailProvider
  private UserRepository: IuserRepository

  constructor (
    EmailProvider: EmailProvider,
    UserRepository: IuserRepository
  ) {
    this.EmailProvider = EmailProvider
    this.UserRepository = UserRepository
  }

  async execute (message: Message, templateEmailSelected: string) {
    const users = await this.UserRepository.listUsers()
    
    const templateEmail = TemplatesForEmails.filter(template => template.title === templateEmailSelected)[0]

    const sendMailPromisses = users.map(async (user) => {
    
      const messageSend = { 
        ...message, 
        to: { name: user.name, email: user.email },  
        body: templateEmail.content, 
        subject: templateEmail.title
      }
      
      return await this.EmailProvider.sendMail(messageSend)
    })

    await Promise.all(sendMailPromisses)
  }
}
