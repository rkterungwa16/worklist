import multer from 'multer';
import { createUser, loginUser, changeProfile } from './controllers/users';
import { createTodoList, createTasks, getTodoList, getTasks } from './controllers/todoList';
import tokenSession from './middleware/tokenSession';

const upload = multer({ dest: 'uploads/' });


const router = (app) => {
  app.get('/api/v1/todolist', tokenSession, getTodoList);
  app.get('/api/v1/tasks/:todoid', tokenSession, getTasks);
  app.post('/api/v1/user/signup', createUser);
  app.post('/api/v1/user/login', loginUser);
  app.post('/api/v1/user/profile', upload.single('photo'), changeProfile);
  app.post('/api/v1/todolist', tokenSession, createTodoList);
  app.post('/api/v1/tasks/:todoid', tokenSession, createTasks);
};
export default router;
