import { Controller, Query, Authorized } from 'vesper';
import { EntityManager } from 'typeorm';
import Role from '../entity/Role';

@Controller()
class RoleController {
  constructor(
    private entityManager: EntityManager,
  ) { }

  @Authorized(['ALL'])
  @Query({ name: 'roles' })
  async getRoles(): Promise<Role[]> {
    return this.entityManager.find(Role);
  }
}

export default RoleController;
