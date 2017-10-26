import { CREATE_TASK_FORM, SENDING_REQUEST, TASKS_CREATED_SUCCESSFULLY,
  GET_TASKS
} from '../actions/actionTypes';

const initialGroupState = {
  formState: {
    todolist: ''
  },
  currentlySending: false,
  tasks: [],
  success: false
};

// The create group reducer
const createGroup = (state = initialGroupState, action) => {
  switch (action.type) {
    case CREATE_TASK_FORM:
      return { ...state, formState: action.newFormState };
    case SENDING_REQUEST:
      return { ...state, currentlySending: action.sending };
    case GET_TASKS:
      return { ...state, tasks: action.value };
    case TASKS_CREATED_SUCCESSFULLY:
      return { ...state, todolists: action.value };
    default:
      return state;
  }
};

export default createGroup;
