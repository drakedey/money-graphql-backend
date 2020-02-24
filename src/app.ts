/* eslint-disable no-console */
import { bootstrap } from 'vesper';

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
