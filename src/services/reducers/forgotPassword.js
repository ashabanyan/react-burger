import {  FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_ERROR, 
          RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_ERROR,
        } from '../actions/forgotPassword';

const initialState = {
  forgotPasswordRequest: false,
  forgotPasswordStatus: false,
  forgotPasswordError: false,

  resetPasswordRequest: false,
  resetPasswordStatus: false,
  resetPasswordError: false,

  recoveryStage: null,
}

export const forgotPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    // Блок FORGOT PASSWORD
    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        forgotPasswortRequest: true,
      }
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPasswortRequest: false,
        forgotPasswordStatus: true,
        recoveryStage: 1,
      }
    case FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        forgotPasswortRequest: false,
        forgotPasswordStatus: false,
        forgotPasswordError: true,
      }
    // Блок RESET PASSWORD
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        resetPasswortRequest: true,
      }
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswortRequest: false,
        resetPasswordStatus: true,
      }
    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        resetPasswortRequest: false,
        resetPasswordStatus: false,
        resetPasswordError: true,
      }
    default: return state;
  }
}