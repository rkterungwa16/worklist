import { SET_SIGNUP_ERROR, SET_LOGIN_ERROR,
  SET_TODO_FORM_ERROR,
  SET_TASK_FORM_ERROR
} from '../actions/actionTypes';

const initialErrorState = {
  signupError: '',
  loginError: '',
  todoFormError: '',
  taskFormError: ''
};

const error = (state = initialErrorState, action) => {
  switch (action.type) {
    case SET_SIGNUP_ERROR:
      return { ...state, signupError: action.value };
    case SET_LOGIN_ERROR:
      return { ...state, loginError: action.value };
    case SET_TODO_FORM_ERROR:
      return { ...state, todoFormError: action.value };
    case SET_TASK_FORM_ERROR:
      return { ...state, taskFormError: action.value };
    default:
      return state;
  }
};

export default error;
