import { combineReducers } from 'redux';
import GoogleSignup from './googleSignupReducer';
import Signup from './userSignupReducer';
import Login from './userLoginReducer';
import todo from './todoListReducer';
import task from './taskReducer';
import authenticated from './authReducer';
import error from './errorReducer';
import profile from './profileReducer';
import user from './userReducer';

const appReducer = combineReducers({
  GoogleSignup,
  Signup,
  Login,
  todo,
  task,
  authenticated,
  error,
  profile,
  user
});

export default appReducer;
