import { EMAIL_SUCCESS } from '../actions/actionTypes';

const initialforgotPasswordState = {
  success: {}
};

const profile = (state = initialforgotPasswordState, action) => {
  switch (action.type) {
    case EMAIL_SUCCESS:
      return { ...state, success: action.value };
    default:
      return state;
  }
};

export default profile;
