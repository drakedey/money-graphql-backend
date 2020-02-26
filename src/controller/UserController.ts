import {
  Controller, Query, Mutation, Authorized, ArgsValidator,
} from 'vesper';

import { EntityManager } from 'typeorm';

import User from '../entity/User';
import UserValidator from '../validators/UserValidator';

@Controller()
class UserController {
  constructor(
    private entityManager: EntityManager,
  ) { }

  @Authorized()
  @Query()
  async users(): Promise<User[]> {
    return this.entityManager.find(User);
  }

  @Query()
  user({ id }: User): Promise<User | undefined> {
    return this.entityManager.findOne(User, id);
  }

  @Mutation()
  @ArgsValidator(UserValidator)
  createUser(user: User): Promise<User> {
    const createdUser = this.entityManager.create(User, user);
    createdUser.setEncriptedPassword();
    return this.entityManager.save(User, createdUser);
  }

  @Mutation()
  async deleteUser({ id }: User): Promise<User | undefined> {
    const user = await this.entityManager.findOne(User, { id });
    this.entityManager.delete(User, { id });
    return user;
  }
}

export default UserController;
