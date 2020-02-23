import { Controller, Query, Mutation } from 'vesper';

import { EntityManager } from 'typeorm';

import User from '../entity/User';

@Controller()
class UserController {
  constructor(
    private entityManager: EntityManager,
  ) { }

  @Query()
  async users(): Promise<User[]> {
    return this.entityManager.find(User);
  }

  @Query()
  user({ id }: User): Promise<User | undefined> {
    return this.entityManager.findOne(User, id);
  }

  @Mutation()
  createUser(user: User): Promise<User> {
    const createdUser = this.entityManager.create(User, user);
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
