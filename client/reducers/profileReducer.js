import { CHANGE_PROFILE_SUCCESS } from '../actions/actionTypes';

const initialProfileState = {
  success: false
};

const profile = (state = initialProfileState, action) => {
  switch (action.type) {
    case CHANGE_PROFILE_SUCCESS:
      return { ...state, success: action.value };
    default:
      return state;
  }
};

export default profile;
