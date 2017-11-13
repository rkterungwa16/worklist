import { combineReducers } from 'redux';
import todo from './todoListReducer';
import task from './taskReducer';
import authenticated from './authReducer';
import error from './errorReducer';
import profile from './profileReducer';
import collaborator from './collaboratorReducer';
import user from './userReducer';
import resetPassword from './resetPasswordReducer';

const appReducer = combineReducers({
  todo,
  task,
  authenticated,
  error,
  profile,
  user,
  collaborator,
  resetPassword
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
