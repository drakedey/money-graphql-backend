/* eslint-disable no-console */
import { bootstrap } from 'vesper';

import Entities from './entity';
import { setupContainer, authorizationChecker } from './middleware';

bootstrap({
  port: 4000,
  controllers: [`${__dirname}/controller/*.ts`],
  entities: [...Entities],
  schemas: [`${__dirname}/schema/**/*.graphql`],
  cors: true,
  setupContainer: async (container, action) => {
    await setupContainer(container, action);
  },
  authorizationChecker: async (requiredPermissions: string[], action) => {
    authorizationChecker(requiredPermissions, action);
  },
})
  .then(() => {
    console.log(
      'Your app is up and running on http://localhost:4000. '
        + 'You can use playground in development mode on http://localhost:4000/playground',
    );
  })
  .catch((error) => {
    console.error(error.stack ? error.stack : error);
  });
