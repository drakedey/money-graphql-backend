import { createConnection } from 'typeorm';

import RoleController from '../controller/RoleController';
import Role from '../entity/Role';

let roleController: RoleController;

beforeAll(async () => {
  const conn = await createConnection();
  roleController = new RoleController(conn.manager);
});

describe('RoleController', () => {
  it('Should show all the roles in database', async () => {
    const roles: Role[] = await roleController.getRoles();
    roles.forEach((role) => {
      expect(role).toBeInstanceOf(Role);
    });
  });
});
