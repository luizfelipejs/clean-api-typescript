/* eslint-disable no-useless-constructor */
import SendMailCase from '../useCases/sendMail/sendMailCase'
import { request } from './http/request'
import { response } from './http/response'

export class SendMailController {
  constructor (private sendMail: SendMailCase) {}

  public async execute (request: request, response: response) {
    const { email } = request.body

    await this.sendMail.execute({ ...email, to: undefined })

    return response.json({ message: 'emails enviados' })
  }
}
