import { createConnection } from 'typeorm';

import LoginPayload from '../payload/LoginPayload';
import AuthController from '../controller/AuthController';

let authController: AuthController;

beforeAll(async () => {
  const conn = await createConnection();
  authController = new AuthController(conn.manager);
});


describe('AuthCotroller', () => {
  it('Should login a user and return token', async () => {
    const loginData = new LoginPayload();
    loginData.email = 'joskarandres97@gmail.com';
    loginData.password = '1234';
    const token = await authController.login(loginData);
    expect(token).toBeDefined();
  });
});
