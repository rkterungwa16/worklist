import request from 'supertest';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../../../models/userModel';
import Todo from '../../../models/todoListModel';
import Task from '../../../models/taskModel';
import app from '../../../../buildScripts/srcServer';
import { setupDatabase, reset } from '../utils/db';

import mockUser from '../fixtures/userMockData.json';

const users = mockUser[0];

describe('User', () => {
  beforeEach(() => {
    setupDatabase();
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(users.password, salt);
    User.create(new User({
      username: users.username,
      email: users.email,
      password,
      salt
    }));
  });

  afterEach(() => {
    reset();
  });

  it('should get a user', () => {
    // /api/v1/user/:id
    new User({
      username: 'newuser',
      password: 'newuser_password',
      email: 'newuser@example.com'
    }).save((err, user) => {
      const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + 10,
        id: users._id }, process.env.SECRET_KEY);
      console.log('TEST USER ID', user._id);
      request(app)
        .get(`/api/v1/user/${user._id}`)
        .set('x-access-token', token)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          console.log('THE RESPONSE BODY', res.body);
        })
        .end((err, res) => {
          console.log('GET USER RESPONSE', res.body);
          expect(typeof res.body).toEqual('object');
        });
    });
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
        expect(typeof res.body).toEqual('object');
        done();
      });
  });

  it('should login', (done) => {
    request(app)
      .post('/api/v1/user/login')
      .send({
        password: 'johns',
        email: 'johndoe@example.com'
      })
      .expect(201)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((err, res) => {
        expect(typeof res.body).toEqual('object');
        done();
      });
  });

  it('should create a todo', (done) => {
    new User({
      username: 'newuser',
      password: 'newuser_password',
      email: 'newuser@example.com',
      name: 'doe'
    }).save((err, user) => {
      const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + 10,
        id: users.id }, 'secrete_key');
      request(app)
        .post(`/api/v1/todolist/${user._id}`)
        .set('x-access-token', token)
        .send({
          todo: 'johns',
          author: user._id
        })
        .expect(201)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((err, res) => {
          expect(typeof res.body).toEqual('object');
          done();
        });
    });
  });

  it('should create a task', (done) => {
    const dateCreated = new Date().getDate();
    const dueDate = new Date().setDate(30);
    const newTask = {
      task: 'click bait',
      dateCreated,
      dueDate,
      priority: 'normal'
    };
    new User({
      username: 'newuser',
      password: 'newuser_password',
      email: 'newuser@example.com',
      name: 'doe'
    }).save((err, user) => {
      const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + 10,
        id: users.id }, 'secrete_key');
      const todo = new Todo({
        author: user._id,
        todo: 'Clear the rubbish'
      });
      todo.save((err, todo) => {
        request(app)
          .post(`/api/v1/user/${user._id}/${todo._id}`)
          .set('x-access-token', token)
          .send(newTask)
          .expect(201)
          .expect('Content-Type', 'application/json; charset=utf-8')
          .end((err, res) => {
            expect(typeof res.body).toEqual('object');
            done();
          });
      });
    });
  });

  it('should not edit his profile password with empty strings', (done) => {
    request(app)
      .post('/api/v1/user/signup')
      .send({
        username: 'newuser',
        password: 'newuser_password',
        email: 'newuser@example.com',
        name: 'doe'
      })
      .end((err, res) => {
        expect(typeof res.body).toEqual('object');
        done();
      });
    // new User({
    //   username: 'newuser',
    //   password: 'newuser_password',
    //   email: 'newuser@example.com'
    // }).save((err, user) => {
    //   const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + 10,
    //     id: users.id }, 'secrete_key');
    //   request(app)
    //     .post(`/api/v1/user/profile/${user._id}`)
    //     .set('x-access-token', token)
    //     .send({
    //       password: '',
    //       newPassword: ''
    //     })
    //     .expect(401)
    //     .expect('Content-Type', 'application/json; charset=utf-8')
    //     .end((err, res) => {
    //       console.log('EDIT PROFILE', res.body)
    //       expect(typeof res.body).toEqual('object');
    //       done();
    //     });
    // });
  });

  it('should edit his profile username only', (done) => {
    new User({
      username: 'newuser',
      password: 'newuser_password',
      email: 'newuser@example.com',
      name: 'doe'
    }).save((err, user) => {
      const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + 10,
        id: users.id }, 'secrete_key');
      request(app)
        .post(`/api/v1/user/profile/${user._id}`)
        .set('x-access-token', token)
        .send({
          newPassword: '',
          username: 'johndoe'
        })
        .expect(401)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((err, res) => {
          expect(typeof res.body).toEqual('object');
          done();
        });
    });
  });

  it('should edit his profile password only', (done) => {
    new User({
      username: 'newuser',
      password: 'newuser_password',
      email: 'newuser@example.com',
      name: 'doe'
    }).save((err, user) => {
      const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + 10,
        id: users.id }, 'secrete_key');
      request(app)
        .post(`/api/v1/user/profile/${user._id}`)
        .set('x-access-token', token)
        .send({
          newPassword: 'john',
          username: ''
        })
        .expect(401)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((err, res) => {
          console.log('EDIT PROFILE password', res.body);
          expect(typeof res.body).toEqual('object');
          done();
        });
    });
  });

  it('should complete a task', (done) => {
    const dateCreated = new Date().getDate();
    const dueDate = new Date().setDate(30);
    const newTask = {
      task: 'click bait',
      dateCreated,
      dueDate,
      priority: 'normal'
    };
    new User({
      username: 'newuser',
      password: 'newuser_password',
      email: 'newuser@example.com',
      name: 'doe'
    }).save((err, user) => {
      const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + 10,
        id: users.id }, 'secrete_key');
      const todo = new Todo({
        author: user._id,
        todo: 'Clear the rubbish'
      });
      todo.save((err, todo) => {
        const task = new Task(newTask);
        task.save((err, task) => {
          request(app)
            .post('/api/v1/completeTask')
            .set('x-access-token', token)
            .send({
              id: task._id,
              completed: true
            })
            .expect(201)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((err, res) => {
              expect(typeof res.body).toEqual('object');
              done();
            });
        });
      });
    });
  });
  // id_token
  it('should login with google', (done) => {
    request(app)
      .post('/api/v1/auth/google')
      .expect(201)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((err, res) => {
        expect(typeof res.body).toEqual('object');
        done();
      });
  });
});
