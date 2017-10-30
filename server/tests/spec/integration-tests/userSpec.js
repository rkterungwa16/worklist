import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../../../../buildScripts/srcServer';
import { setupDatabase, reset } from '../utils/db';

import User from '../fixtures/userMockData.json';

const users = User[0];
// let token;
// const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + 10,
// id: users.id }, 'my dog');
console.log('THE BUILD SERVER SCRIPT', app);

describe('User-Routes', () => {
  beforeEach((done) => {
    request(app)
      .post('/api/v1/user/signup')
      .send({
        name: 'kunle adewale',
        email: 'kunle@gmail.com',
        password: 'password',
        username: 'kool4life'
      })
      .end((err, res) => {
        const token = res.body.token;
        done()
      });
  });

  afterEach((done) => {
    Promise.resolve(
      User.remove({}, (err) => {
        if (err) return done(err);
      })
    ).then(() => {
      Todo.remove({}, (err) => {
        if (err) return done(err);
      });
    });
    done();
  });

  it('should create a new user', (done) => {
    console.log('THIS IS THE TOKEN FOR TEST', token);
    // request(app)
    //   .post('/api/group/1/2')
    //   .set('x-access-token', token)
    //   .end((err, res) => {
    //     expect(res.status).toEqual(500);
    //     expect(typeof res.body).toEqual('string');
    //     expect(res.body).toEqual('User does not exist');
    //   });
  });
});
