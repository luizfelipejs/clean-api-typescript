export interface adress {
  name: string;
  email: string;
}

export interface Message {
  from: adress;
  to: adress;
  subject: string;
  body: string;
}

export interface EmailProvider {
  sendMail: (message: Message) => Promise<void>
}