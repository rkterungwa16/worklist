import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../../../../buildScripts/srcServer';
import { setupDatabase, reset } from '../utils/db';

import User from '../fixtures/userMockData.json';

const users = User[0];

const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + 10,
  id: users.id }, 'my dog');

describe('User-Routes', () => {
  beforeEach((done) => {
    setupDatabase(done);
  });

  afterEach((done) => {
    reset(done);
  });

  it('should create a new user', (done) => {
    request(app)
      .post('/api/v1/user/signup')
      .send({
        username: 'newuser',
        password: 'newuser_password',
        email: 'newuser@example.com',
        name: 'doe'
      })
      .expect(201)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((err, res) => {
        console.log('The response for creating a new user', res.body);
        expect(res.body).toEqual({ token });
        done();
      });
  });
});
