import {
  createUser,
  loginUser,
  editProfile,
  googleAuth,
  getUser
} from './controllers/users';
import {
  createTodo,
  createTasks,
  getTodoList,
  getTasks,
  completeTask,
  taskDueDate,
  addCollaborator,
  getTodoItem
} from './controllers/todoController';
import tokenSession from './middleware/tokenSession';

const router = (app) => {
  app.get('/api/v1/todolist/:id', tokenSession, getTodoList);
  app.get('/api/v1/todo/:todoId', tokenSession, getTodoItem);
  app.get('/api/v1/tasks/:id/:todoid', tokenSession, getTasks);
  app.get('/api/v1/user/:id', tokenSession, getUser);
  app.post('/api/v1/user/signup', createUser);
  app.post('/api/v1/user/login', loginUser);
  app.post('/api/v1/completeTask', tokenSession, completeTask);
  app.post('/api/v1/dueDate', tokenSession, taskDueDate);
  app.post('/api/v1/user/profile/:id', tokenSession, editProfile);
  app.post('/api/v1/todos/', tokenSession, createTodo);
  app.post('/api/v1/tasks/', tokenSession, createTasks);
  app.post('/api/v1/collaborator/', tokenSession, addCollaborator);
  app.post('/api/v1/auth/google', googleAuth);
};
export default router;
