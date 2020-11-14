import Nodemailer from 'nodemailer'
import { EmailProvider, Message } from '../../providers/EmailProvider'
import { auth, port, host } from '../config/MailTrap.json'

export class NodemailerEmailProvider implements EmailProvider {
  private transporter = Nodemailer.createTransport({
    host,
    port,
    auth
  });

  async sendMail (message: Message): Promise<void> {
    this.transporter.sendMail({
      from: message.from.name + '<' + message.from.email + '>',
      to: message.to.email,
      subject: message.subject,
      text: message.body
    })
  }
}
