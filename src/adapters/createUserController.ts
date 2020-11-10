import createUserCase from "../useCases/createUserCase";
import { request } from './http/request';
import { response } from './http/response';


export class CreateUserController {
  constructor(private createUserCase: createUserCase) {}

  public async execute(request: request, response: response) {
    const { email, name } = request.body;
    const user = await this.createUserCase.execute({ email, name });

    return response.json({ message: "usuario criado", userCreated: user })
  }
}
