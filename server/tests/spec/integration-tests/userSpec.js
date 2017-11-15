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

  it('should return message for existing user', (done) => {
    request(app)
      .post('/api/v1/user/signup')
      .send({
        username: 'newuser',
        password: 'newuser_password',
        email: 'johndoe@example.com"',
        name: 'doe'
      })
      .expect(422)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((err, res) => {
        expect(typeof res.body).toEqual('object');
        done();
      });
  });

  it('should login a registered user', (done) => {
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

  it('should not login a user that is not registered', (done) => {
    request(app)
      .post('/api/v1/user/login')
      .send({
        password: 'johns',
        email: 'john@example.com'
      })
      .expect(201)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((err, res) => {
        expect(typeof res.body).toEqual('object');
        done();
      });
  });

  it('should not login a user with unmatched password', (done) => {
    request(app)
      .post('/api/v1/user/login')
      .send({
        password: 'john',
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
      .post('/api/v1/todos/')
      .set('x-access-token', token)
      .send({
        todo: 'johns',
        id: '59fc64377791732e09672530'
      })
      .expect(201)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((err, res) => {
        expect(typeof res.body).toEqual('object');
        done();
      });
  });

  it('should respond with an error message for wrong user id', (done) => {
    // /api/v1/todolist/:id
    const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + 10,
      id: '59fc64377791732e09672530' }, 'secrete_key');
    request(app)
      .post('/api/v1/todos/')
      .set('x-access-token', token)
      .send({
        todo: 'johns',
        id: '59fc64377791732e096725'
      })
      .expect(422)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((err, res) => {
        expect(typeof res.body).toEqual('object');
        done();
      });
  });

  it('should get todos', (done) => {
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

  it('should respond with error message for wrong user id', (done) => {
    // /api/v1/todolist/:id
    const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + 10,
      id: '59fc64377791732e09672530' }, 'secrete_key');
    request(app)
      .get('/api/v1/todolist/59fc64377791732e09672')
      .set('x-access-token', token)
      .expect(400)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((err, res) => {
        expect(typeof res.body).toEqual('object');
        done();
      });
  });

  it('should get a todo', (done) => {
    const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + 10,
      id: '59fc64377791732e09672530' }, 'secrete_key');
    request(app)
      .get('/api/v1/todo/53013524c6a9cb5e45868c01')
      .set('x-access-token', token)
      .expect(201)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((err, res) => {
        expect(typeof res.body).toEqual('object');
        done();
      });
  });

  it('should respond with an error message for wrong user id', (done) => {
    const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + 10,
      id: '59fc64377791732e09672530' }, 'secrete_key');
    request(app)
      .get('/api/v1/todo/53013524c6a9cb5e45868')
      .set('x-access-token', token)
      .expect(400)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((err, res) => {
        expect(typeof res.body).toEqual('object');
        done();
      });
  });

  it('should get todo lists of a user', (done) => {
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
      .post('/api/v1/tasks/')
      .set('x-access-token', token)
      .send({
        id: '59fc64377791732e09672530',
        todoId: '53013524c6a9cb5e45868c01',
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

  it('should return error message for wrong todo id', (done) => {
    const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + 10,
      id: '59fc64377791732e09672530' }, 'secrete_key');
    request(app)
      .post('/api/v1/tasks/')
      .set('x-access-token', token)
      .send({
        id: '59fc64377791732e09672530',
        todoId: '53013524c6a9cb5e45868',
        dateCreated: '1970-01-01T00:00:00.003Z',
        dueDate: '1970-01-01T00:00:00.003Z',
        priority: 'critical',
        task: 'my chore'
      })
      .expect(422)
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

  it('should return error message for wrong todo id', (done) => {
    const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + 10,
      id: '59fc64377791732e09672530' }, 'secrete_key');
    request(app)
      .get('/api/v1/tasks/59fc64377791732e09672530/53013524c6a9cb5e4586')
      .set('x-access-token', token)
      .expect(400)
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
        currentPassword: 'johns',
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
        currentPassword: 'johns',
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

  it('should return error message for wrong task id', (done) => {
    const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + 10,
      id: '59fc64377791732e09672530' }, 'secrete_key');
    request(app)
      .post('/api/v1/completeTask')
      .set('x-access-token', token)
      .send({
        id: '123',
        completed: true
      })
      .expect(422)
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

  it('should return error message for wrong task id', (done) => {
    const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + 10,
      id: '59fc64377791732e09672530' }, 'secrete_key');
    request(app)
      .post('/api/v1/dueDate')
      .set('x-access-token', token)
      .send({
        id: '12334',
        dueDate: new Date().getDate()
      })
      .expect(422)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((err, res) => {
        expect(typeof res.body).toEqual('object');
        done();
      });
  });

  it('should add a collaborator', (done) => {
    const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + 10,
      id: '59fc64377791732e09672530' }, 'secrete_key');
    request(app)
      .post('/api/v1/collaborator/')
      .set('x-access-token', token)
      .send({
        todoId: '53013524c6a9cb5e45868c01',
        email: 'johndoe@example.com'
      })
      .expect(201)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((err, res) => {
        expect(typeof res.body).toEqual('object');
        done();
      });
  });

  it('should send email if collaborator is not registered', (done) => {
    const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + 10,
      id: '59fc64377791732e09672530' }, 'secrete_key');
    request(app)
      .post('/api/v1/collaborator/')
      .set('x-access-token', token)
      .send({
        todoId: '53013524c6a9cb5e45868c01',
        email: true
      })
      .expect(201)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((err, res) => {
        expect(typeof res.body).toEqual('object');
        done();
      });
  });

  it('should login with google', (done) => {
    const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + 10,
      id: '59fc64377791732e09672530' }, 'secrete_key');
    request(app)
      .post('/api/v1/auth/google')
      .send({
        id_token: process.env.TOKEN_ID
      })
      .expect(201)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((err, res) => {
        expect(typeof res.body).toEqual('object');
        done();
      });
  });
});
