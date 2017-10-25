import { combineReducers } from 'redux';
import GoogleSignup from './googleSignupReducer';
import Signup from './userSignupReducer';
import Login from './userLoginReducer';

const user = combineReducers({
  GoogleSignup,
  Signup,
  Login
});

export default user;
