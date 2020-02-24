/* eslint-disable no-console */
import { bootstrap } from 'vesper';
import { getManager } from 'typeorm';
import * as jwt from 'jsonwebtoken';

import UserController from './controller/UserController';
import User from './entity/User';
import AccountController from './controller/AccountController';
import { Transaction } from './entity/Transaction';
import AuthController from './controller/AuthController';

bootstrap({
  port: 3000,
  controllers: [UserController, AccountController, AuthController],
  entities: [User, Transaction],
  schemas: [`${__dirname}/schema/**/*.graphql`],
  setupContainer: async (container, action) => {
    const { request } = action;
    const token: string = request?.headers['token'] as string || '';

    if (token === '') return;

    const entityManager = getManager();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload: any = jwt.verify(token, 'SECRET');
    console.log(payload);
    const currentUser = await entityManager.findOneOrFail(User, { id: payload?.id });

    container.set(User, currentUser);
  },
  authorizationChecker: (roles: string[], action) => {
    const currentUser = action.container.get(User);
    if (currentUser.id === undefined) {
      throw new Error('{"error": "Usuario no encontrado"}');
    }
  },
})
  .then(() => {
    console.log(
      'Your app is up and running on http://localhost:3000. '
        + 'You can use playground in development mode on http://localhost:3000/playground',
    );
  })
  .catch((error) => {
    console.error(error.stack ? error.stack : error);
  });
