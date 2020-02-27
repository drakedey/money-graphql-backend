/* eslint-disable no-plusplus */
/* eslint-disable no-console */
import { bootstrap } from 'vesper';

import Entities from './entity';
import Controllers from './controller';
import { setupContainer, authorizationChecker } from './middleware';

bootstrap({
  port: 3000,
  controllers: [...Controllers],
  entities: [...Entities],
  schemas: [`${__dirname}/schema/**/*.graphql`],
  setupContainer: async (container, action) => {
    await setupContainer(container, action);
  },
  authorizationChecker: async (requiredPermissions: string[], action) => {
    authorizationChecker(requiredPermissions, action);
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
