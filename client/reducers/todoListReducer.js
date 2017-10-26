import { CREATE_TODOLIST_FORM, SENDING_REQUEST, TODO_CREATED_SUCCESSFULLY,
  GET_TODO_ITEM_ID,
  GET_TODOLISTS
} from '../actions/actionTypes';

const initialGroupState = {
  formState: {
    todolist: ''
  },
  currentlySending: false,
  todolists: [],
  success: true,
  todoId: ''
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
    case GET_TODO_ITEM_ID:
      return { ...state, todoId: action.value };
    case TODO_CREATED_SUCCESSFULLY:
      return { ...state, success: action.value };
    default:
      return state;
  }
};

export default createGroup;
