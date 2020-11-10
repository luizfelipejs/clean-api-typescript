import { Router } from "express";
import { UserRepository } from "../external/repositories/UserRepository";
import CreateUserCase from "../useCases/createUserCase";
import { getCustomRepository } from "typeorm";
import { CreateUserController } from '../adapters/createUserController'
import { NodemailerEmailProvider } from "../external/providers/NodemailerEmailProvider";
 
const routes = Router();

routes.post('/user', async (request, response) => {
  const customUserRepository = getCustomRepository(UserRepository);
  const nodeMailerProvider = new NodemailerEmailProvider();
  const createUserCase = new CreateUserCase(customUserRepository, nodeMailerProvider);
  const createUser = new CreateUserController(createUserCase);

  await createUser.execute(request, response)
})

export default routes;