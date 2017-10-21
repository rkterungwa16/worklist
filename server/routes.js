import multer from 'multer';
import { createUser, loginUser, changeProfile } from './controllers/users';

const upload = multer({ dest: 'uploads/' });

console.log(upload);

const router = (app) => {
  app.post('/api/user/signup', createUser);
  app.post('/api/user/login', loginUser);
  app.post('/api/user/profile', upload.single('photo'), changeProfile);
};
export default router;
