import request from 'supertest';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import decodeJwt from 'jwt-decode';
import User from '../../../models/userModel';
import Todo from '../../../models/todoListModel';
import Task from '../../../models/taskModel';
import app from '../../../../buildScripts/srcServer';
import { reset } from '../utils/db';

import mockUser from '../fixtures/userMockData.json';
import mockTodo from '../fixtures/todoMockData.json';
import mockTask from '../fixtures/taskMockData.json';

const users = mockUser[0];
const todo = mockTodo[0];
const task = mockTask[0];

describe('User', () => {
  beforeEach(() => {
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(users.password, salt);
    User.create(new User({
      _id: '59fc64377791732e09672530',
      username: users.username,
      email: users.email,
      password,
      salt
    }));
    Todo.create(new Todo({
      _id: todo._id,
      author: todo.author,
      tasks: todo.tasks,
      collaborators: todo.collaborators
    }));

    Task.create(new Task({
      _id: task._id,
      dateCreated: task.dateCreated,
      task: task.task,
      dueDate: task.dueDate,
      priority: task.priority,
      completed: task.completed
    }));
  });

  afterEach(() => {
    reset();
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

  it('should get a user', (done) => {
    // /api/v1/user/:id
    const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + 10,
      id: '59fc64377791732e09672530' }, 'secrete_key');
    request(app)
      .get('/api/v1/user/59fc64377791732e09672530')
      .set('x-access-token', token)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(typeof res.body).toEqual('object');
        done();
      });
  }, 20000);

  it('should create a todo', (done) => {
    // /api/v1/todolist/:id
    const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + 10,
      id: '59fc64377791732e09672530' }, 'secrete_key');
    request(app)
      .post('/api/v1/todolist/59fc64377791732e09672530')
      .set('x-access-token', token)
      .send({
        todo: 'johns',
        author: '59fc64377791732e09672530'
      })
      .expect(201)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((err, res) => {
        expect(typeof res.body).toEqual('object');
        done();
      });
  });

  it('should get todo lists of a user', (done) => {
    // /api/v1/todolist/:id
    const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + 10,
      id: '59fc64377791732e09672530' }, 'secrete_key');
    request(app)
      .get('/api/v1/todolist/59fc64377791732e09672530')
      .set('x-access-token', token)
      .expect(201)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((err, res) => {
        expect(typeof res.body).toEqual('object');
        done();
      });
  });

  it('should create a task', (done) => {
    const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + 10,
      id: '59fc64377791732e09672530' }, 'secrete_key');
    request(app)
      .post('/api/v1/tasks/59fc64377791732e09672530/53013524c6a9cb5e45868c01')
      .set('x-access-token', token)
      .send({
        dateCreated: '1970-01-01T00:00:00.003Z',
        dueDate: '1970-01-01T00:00:00.003Z',
        priority: 'critical',
        task: 'my chore'
      })
      .expect(201)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((err, res) => {
        expect(typeof res.body).toEqual('object');
        done();
      });
  });

  it('should get tasks', (done) => {
    const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + 10,
      id: '59fc64377791732e09672530' }, 'secrete_key');
    request(app)
      .get('/api/v1/tasks/59fc64377791732e09672530/53013524c6a9cb5e45868c01')
      .set('x-access-token', token)
      .expect(201)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((err, res) => {
        expect(typeof res.body).toEqual('object');
        done();
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
  });

  it('should edit his profile username only', (done) => {
    const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + 10,
      id: '59fc64377791732e09672530' }, 'secrete_key');
    request(app)
      .post('/api/v1/user/profile/59fc64377791732e09672530')
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

  it('should edit his profile password only', (done) => {
    const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + 10,
      id: '59fc64377791732e09672530' }, 'secrete_key');
    request(app)
      .post('/api/v1/user/profile/59fc64377791732e09672530')
      .set('x-access-token', token)
      .send({
        newPassword: 'johndoe',
        username: ''
      })
      .expect(401)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((err, res) => {
        expect(typeof res.body).toEqual('object');
        done();
      });
  });

  it('should complete a task', (done) => {
    const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + 10,
      id: '59fc64377791732e09672530' }, 'secrete_key');
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

  it('should set due date', (done) => {
    const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + 10,
      id: '59fc64377791732e09672530' }, 'secrete_key');
    request(app)
      .post('/api/v1/dueDate')
      .set('x-access-token', token)
      .send({
        id: task._id,
        dueDate: new Date().getDate()
      })
      .expect(201)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((err, res) => {
        expect(typeof res.body).toEqual('object');
        done();
      });
  });
  // id_token
  // it('should login with google', (done) => {
  //   const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + 10,
  //     id: '59fc64377791732e09672530' }, 'secrete_key');
  //   request(app)
  //     .post('/api/v1/auth/google')
  //     .send({
  //       id_token: token
  //     })
  //     .expect(201)
  //     .expect('Content-Type', 'application/json; charset=utf-8')
  //     .end((err, res) => {
  //       expect(typeof res.body).toEqual('object');
  //       done();
  //     });
  // });
});
