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
  completeTask,
  taskDueDate
} from './controllers/todoList';
import tokenSession from './middleware/tokenSession';

const router = (app) => {
  app.get('/api/v1/todolist/:id', tokenSession, getTodoList);
  app.get('/api/v1/tasks/:id/:todoid', tokenSession, getTasks);
  app.get('/api/v1/user/:id', tokenSession, getUser);
  app.post('/api/v1/user/signup', createUser);
  app.post('/api/v1/user/login', loginUser);
  app.post('/api/v1/completeTask', tokenSession, completeTask);
  app.post('/api/v1/dueDate', tokenSession, taskDueDate);
  app.post('/api/v1/user/profile/:id', tokenSession, editProfile);
  app.post('/api/v1/todolist/:id', tokenSession, createTodoList);
  app.post('/api/v1/tasks/:id/:todoid', tokenSession, createTasks);
  app.post('/api/v1/auth/google', googleAuth);
};
export default router;
