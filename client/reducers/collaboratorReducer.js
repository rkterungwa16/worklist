import { ADDED_COLLABORATOR_SUCCESS } from '../actions/actionTypes';

const initialCollaboratorState = {
  success: {}
};

const profile = (state = initialCollaboratorState, action) => {
  switch (action.type) {
    case ADDED_COLLABORATOR_SUCCESS:
      return { ...state, success: action.value };
    default:
      return state;
  }
};

export default profile;
