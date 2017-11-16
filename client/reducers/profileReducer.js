import {
  CHANGE_PROFILE_SUCCESS,
  SENDING_REQUEST
} from '../actions/actionTypes';

const initialProfileState = {
  success: false,
  sending: false
};

const profile = (state = initialProfileState, action) => {
  switch (action.type) {
    case CHANGE_PROFILE_SUCCESS:
      return { ...state, success: action.value };
    case SENDING_REQUEST:
      return { ...state, sending: action.value };
    default:
      return state;
  }
};

export default profile;
