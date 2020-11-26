import SendMailCase from '../useCases/sendMail/sendMailCase'
import { request } from './http/request'
import { response } from './http/response'

export class SendMailController {
  private sendMail: SendMailCase
  
  constructor (sendMail: SendMailCase) {
    this.sendMail = sendMail
  }

  public async execute (request: request, response: response) {
    const { email, template } = request.body

    await this.sendMail.execute({ ...email, to: undefined, }, template)

    return response.json({ message: 'emails enviados' })
  }
}
