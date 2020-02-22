import { createConnection } from 'typeorm';

import User from '../src/entity/User';

export default createConnection({
  type: 'postgres',
  host: 'localhost',
  port: 5435,
  username: 'tuten_user',
  password: 'holatuten123.',
  database: 'money_management',
  entities: [
    User,
  ],
  synchronize: false,
  logging: true,
});
