import { PASSWORD_RESET_SUCCESS } from '../actions/actionTypes';

const initialresetPasswordState = {
  success: {}
};

const profile = (state = initialresetPasswordState, action) => {
  switch (action.type) {
    case PASSWORD_RESET_SUCCESS:
      return { ...state, success: action.value };
    default:
      return state;
  }
};

export default profile;
