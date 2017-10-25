import { CREATE_TODOLIST_FORM, SENDING_REQUEST,
  GET_TODOLISTS
} from '../actions/actionTypes';

const initialGroupState = {
  formState: {
    groupName: '',
    description: ''
  },
  currentlySending: false,
  todolists: []
};

// The create group reducer
const createGroup = (state = initialGroupState, action) => {
  switch (action.type) {
    case CREATE_TODOLIST_FORM:
      return { ...state, formState: action.newFormState };
    case SENDING_REQUEST:
      return { ...state, currentlySending: action.sending };
    case GET_TODOLISTS:
      return { ...state, todolists: action.value };
    default:
      return state;
  }
};

export default createGroup;
