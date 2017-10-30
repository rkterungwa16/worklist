import {
  createUser,
  loginUser,
  editProfile,
  googleAuth,
  getUser
} from './controllers/users';
import {
  createTodoList,
  createTasks,
  getTodoList,
  getTasks,
  completeTask
} from './controllers/todoList';
import tokenSession from './middleware/tokenSession';

const router = (app) => {
  app.get('/api/v1/todolist/:id', getTodoList);
  app.get('/api/v1/tasks/:id/:todoid', getTasks);
  app.get('/api/v1/user/:id', getUser);
  app.post('/api/v1/user/signup', createUser);
  app.post('/api/v1/user/login', loginUser);
  app.post('/api/v1/completeTask', completeTask);
  app.post('/api/v1/user/profile/:id', editProfile);
  app.post('/api/v1/todolist/:id', createTodoList);
  app.post('/api/v1/tasks/:id/:todoid', createTasks);
  app.post('/api/v1/auth/google', googleAuth);
};
export default router;
