import { combineReducers } from 'redux';
import GoogleSignup from './googleSignupReducer';
import Signup from './userSignupReducer';
import Login from './userLoginReducer';
import todo from './todoListReducer';
import task from './taskReducer';
import authenticated from './authReducer';
import error from './errorReducer';
import profile from './profileReducer';
import collaborator from './collaboratorReducer';
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
  user,
  collaborator
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
