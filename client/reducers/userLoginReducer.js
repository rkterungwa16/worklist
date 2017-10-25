import { CHANGE_LOGIN_FORM, LOGIN_REQUEST, SET_AUTH, SET_LOGIN_ERROR,
  SENDING_REQUEST } from '../actions/actionTypes';

const initialLoginState = {
  formState: {
    username: '',
    password: ''
  },
  error: '',
  sending: false,
  loggedIn: false,
  currentlySending: false
};

const login = (state = initialLoginState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, currentlySending: action.sending };
    case CHANGE_LOGIN_FORM:
      return { ...state, formState: action.newFormState };
    case SET_AUTH:
      return { ...state, loggedIn: action.newAuthState };
    case SET_LOGIN_ERROR:
      return { ...state, error: action.value };
    case SENDING_REQUEST:
      return { ...state, currentlySending: action.sending };
    default:
      return state;
  }
};

export default login;
