import { Action, Authorized, Controller, Mutation, Query } from 'vesper';
import { EntityManager } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import LoginPayload from '../payload/LoginPayload';
import User from '../entity/User';

@Controller()
class AuthController {
  constructor(private entityManager: EntityManager, private action: Action) {}

  @Mutation()
  async login(args: LoginPayload): Promise<string> {
    const user = await this.entityManager.findOneOrFail(User, {
      email: args.email,
    });
    if (!(await user.checkPassword(args.password)))
      throw new Error('{ error: "unhautorized" }');

    const token = jwt.sign({ id: user.id }, 'SECRET', { expiresIn: '1h' });
    return token;
  }
}

export default AuthController;
