import { SET_SIGNUP_ERROR, SET_LOGIN_ERROR,
  SET_TODO_FORM_ERROR,
  SET_TASK_FORM_ERROR,
  SET_EDIT_PROFILE_ERROR,
  COLLABORATOR_FORM_ERROR
} from '../actions/actionTypes';

const initialErrorState = {
  signupError: '',
  loginError: '',
  todoFormError: '',
  taskFormError: '',
  editProfileFormError: '',
  collaboratorFormError: ''
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
    case SET_EDIT_PROFILE_ERROR:
      return { ...state, editProfileFormError: action.value };
    case COLLABORATOR_FORM_ERROR:
      return { ...state, collaboratorFormError: action.value };
    default:
      return state;
  }
};

export default error;
