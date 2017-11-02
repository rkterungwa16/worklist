import { CHANGE_REGISTER_FORM, SENDING_REQUEST, SET_REGISTER_ERROR,
} from '../actions/actionTypes';

const initialRegisterState = {
  formState: {
    username: '',
    password: '',
    email: ''
  },
  error: '',
  currentlySending: false
};

// The register reducer
const register = (state = initialRegisterState, action) => {
  switch (action.type) {
    case CHANGE_REGISTER_FORM:
      return { ...state, formState: action.newFormState };
    case SENDING_REQUEST:
      return { ...state, currentlySending: action.sending };
    case SET_REGISTER_ERROR:
      return { ...state, error: action.value };
    default:
      return state;
  }
};

export default register;
