import {  FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_ERROR, 
          RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_ERROR,
        } from '../actions/forgotPassword';

import { TForgotPasswordActions } from '../actions/forgotPassword';

type TForgotPasswordState = {
  forgotPasswordRequest: boolean;
  forgotPasswordStatus: boolean;
  forgotPasswordError: boolean;

  resetPasswordRequest: boolean;
  resetPasswordStatus: boolean;
  resetPasswordError: boolean;

  recoveryStage: 1 | null,
}

const initialState: TForgotPasswordState = {
  forgotPasswordRequest: false,
  forgotPasswordStatus: false,
  forgotPasswordError: false,

  resetPasswordRequest: false,
  resetPasswordStatus: false,
  resetPasswordError: false,

  recoveryStage: null,
}

export const forgotPasswordReducer = (state = initialState, action: TForgotPasswordActions): TForgotPasswordState => {
  switch (action.type) {
    // Блок FORGOT PASSWORD
    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        forgotPasswordRequest: true,
      }
    case FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordStatus: false,
        forgotPasswordError: true,
      }
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordStatus: true,
        recoveryStage: 1,
      }
    // Блок RESET PASSWORD
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        forgotPasswordRequest: true,
      }
    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        forgotPasswordRequest: false,
        resetPasswordStatus: false,
        resetPasswordError: true,
      }
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPasswordRequest: false,
        resetPasswordStatus: true,
      }
    default: return state;
  }
}