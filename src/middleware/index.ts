/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action } from 'vesper';
import { getManager } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import User from '../entity/User';

async function setupContainer(container: any, action: Action): Promise<void> {
  const { request } = action;
  const token: string = (request?.headers['token'] as string) || '';

  if (token === '') return;

  const entityManager = getManager();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const payload: any = jwt.verify(token, 'SECRET');
  const currentUser = await entityManager.findOneOrFail(User, {
    id: payload?.id,
  });

  container.set(User, currentUser);
}

async function authorizationChecker(
  requiredPermissions: string[],
  action: Action,
): Promise<void> {
  const currentUser: User = action.container.get(User);
  if (currentUser.id === undefined) {
    throw new Error('{"error": "Usuario no encontrado"}');
  }

  if (currentUser.role?.id === 'ADMIN') return;
  let hasPermission = false;
  const permissions = await currentUser.role.permissions;
  for (let i = 0; i < requiredPermissions.length; i++) {
    const requiredPermission = requiredPermissions[i];
    hasPermission = Boolean(
      permissions.find((permission) => permission.id === requiredPermission)
    );
    if (hasPermission) break;
  }
  if (!hasPermission) throw new Error('{ "error": "no tiene los permisos necesarios" }');
}

export { setupContainer, authorizationChecker };
