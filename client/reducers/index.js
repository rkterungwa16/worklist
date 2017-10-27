import { combineReducers } from 'redux';
import GoogleSignup from './googleSignupReducer';
import Signup from './userSignupReducer';
import Login from './userLoginReducer';
import todo from './todoListReducer';
import task from './taskReducer';
import authenticated from './authReducer';
import error from './errorReducer';

const user = combineReducers({
  GoogleSignup,
  Signup,
  Login,
  todo,
  task,
  authenticated,
  error
});

export default user;
