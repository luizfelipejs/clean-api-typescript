import { Router } from 'express'
import { UserRepository } from '../external/repositories/UserRepository'
import { getCustomRepository } from 'typeorm'
import { CreateUserController } from '../adapters/createUserController'
import { NodemailerEmailProvider } from '../external/providers/NodemailerEmailProvider'
import CreateUserCase from '../useCases/createUser/createUserCase'
import SendMailCase from '../useCases/sendMail/sendMailCase'
import { SendMailController } from '../adapters/SendMailController'

const routes = Router()

routes.post('/user', async (request, response) => {
  const customUserRepository = getCustomRepository(UserRepository)
  const nodeMailerProvider = new NodemailerEmailProvider()
  const createUserCase = new CreateUserCase(customUserRepository, nodeMailerProvider)
  const createUser = new CreateUserController(createUserCase)

  await createUser.execute(request, response)
})

routes.post('/email', async (request, response) => {
  const customUserRepository = getCustomRepository(UserRepository)
  const nodeMailerProvider = new NodemailerEmailProvider()
  const sendMailCase = new SendMailCase(nodeMailerProvider, customUserRepository)
  const sendMailController = new SendMailController(sendMailCase)

  await sendMailController.execute(request, response)
})

export default routes
