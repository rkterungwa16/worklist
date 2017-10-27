import { SET_SIGNUP_ERROR, SET_LOGIN_ERROR } from '../actions/actionTypes';

const initialErrorState = {
  signupError: '',
  loginError: ''
};

const error = (state = initialErrorState, action) => {
  switch (action.type) {
    case SET_SIGNUP_ERROR:
      return { ...state, signupError: action.value };
    case SET_LOGIN_ERROR:
      return { ...state, loginError: action.value };
    default:
      return state;
  }
};

export default error;
