import { FORGOT_PASSWORD_URL, RESET_PASSWORD_URL } from '../../constants/constants';
import { AppThunk, AppDispatch } from '../types/index';

// FORGOT PASSWORD - Первичный запрос на сброс пароля
export const FORGOT_PASSWORD_REQUEST: 'FORGOT_PASSWORD_REQUEST' = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_ERROR: 'FORGOT_PASSWORD_ERROR' = 'FORGOT_PASSWORD_ERROR';
export const FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS' = 'FORGOT_PASSWORD_SUCCESS';

export interface IForgotPasswordRequestAction {
  readonly type: typeof FORGOT_PASSWORD_REQUEST
}

export interface IForgotPasswordErrorAction {
  readonly type: typeof FORGOT_PASSWORD_ERROR
}

export interface IForgotPasswordSuccessAction {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS
}

export const fetchForgotPasswort: AppThunk = (email: string) => {
  return function(dispatch: AppDispatch) {
    
    dispatch({ type: FORGOT_PASSWORD_REQUEST});

    const data = { "email": email };

    fetch(FORGOT_PASSWORD_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(result => dispatch({ type: FORGOT_PASSWORD_SUCCESS }) )
      .catch(err => dispatch({ type: FORGOT_PASSWORD_ERROR}))
  }
}

//------------------------------------------------------------------------------------------
// RESET PASSWORD - Вторичный запрос на сброс пароля и назначение нового
export const RESET_PASSWORD_REQUEST: 'RESET_PASSWORD_REQUEST' = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_ERROR: 'RESET_PASSWORD_ERROR' = 'RESET_PASSWORD_ERROR';
export const RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS' = 'RESET_PASSWORD_SUCCESS';

export interface IResetPasswordRequestAction {
  readonly type: typeof RESET_PASSWORD_REQUEST
}

export interface IResetPasswordErrorAction {
  readonly type: typeof RESET_PASSWORD_ERROR
}

export interface IResetPasswordSuccessAction {
  readonly type: typeof RESET_PASSWORD_SUCCESS
}

export const fetchResetPassword: AppThunk = (newPassword: string, code: string) => {
  return function(dispatch: AppDispatch) {
    dispatch({ type: RESET_PASSWORD_REQUEST})

    const data = { "password": newPassword, "token": code};

    fetch(RESET_PASSWORD_URL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(result => dispatch({ type: RESET_PASSWORD_SUCCESS}))
      .catch(err => dispatch({ type: RESET_PASSWORD_ERROR}))
  }
} 

export type TForgotPasswordActions = 
  | IForgotPasswordRequestAction
  | IForgotPasswordErrorAction
  | IForgotPasswordSuccessAction
  | IResetPasswordRequestAction
  | IResetPasswordErrorAction
  | IResetPasswordSuccessAction
