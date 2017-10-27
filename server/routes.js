import multer from 'multer';
import {
  createUser,
  loginUser,
  changeProfile,
  googleAuth
} from './controllers/users';
import {
  createTodoList,
  createTasks,
  getTodoList,
  getTasks
} from './controllers/todoList';
import tokenSession from './middleware/tokenSession';

const upload = multer({ dest: 'uploads/' });

const router = (app) => {
  app.get('/api/v1/todolist/:id', getTodoList);
  app.get('/api/v1/tasks/:id/:todoid', getTasks);
  app.post('/api/v1/user/signup', createUser);
  app.post('/api/v1/user/login', loginUser);
  app.post('/api/v1/user/profile', upload.single('photo'), changeProfile);
  app.post('/api/v1/todolist/:id', createTodoList);
  app.post('/api/v1/tasks/:id/:todoid', createTasks);
  app.post('/api/v1/auth/google', googleAuth);
};
export default router;
