import { LOGIN_URL, REGISTRATION_URL, LOGOUT_URL, REFRESH_TOKEN_URL, GET_USER_URL, PATCH_USER_URL  } from '../../constants/constants';
import { IUserData, ISuccessRegistrationData, IRefreshTokenData, IUserRegistrationData, TAnyFunction } from '../../types/common';
import { checkResponse } from '../../utils/js-utils';
// import { Dispatch } from '../types/index';
import { Dispatch } from '../hooks';
// ----- Регистрация ----
export const REGISTRATION_REQUEST: 'REGISTRATION REQUEST' = 'REGISTRATION REQUEST';
export const REGISTRATION_ERROR: 'REGISTRATION ERROR' = 'REGISTRATION ERROR';
export const REGISTRATION_SUCCESS: 'REGISTRATION SUCCESS' = 'REGISTRATION SUCCESS';

export interface IRegistrationRequestAction {
  readonly type: typeof REGISTRATION_REQUEST
}

export interface IRegistrationRequestError {
  readonly type: typeof REGISTRATION_ERROR
}

export interface IRegistrationSuccessAction {
  readonly type: typeof REGISTRATION_SUCCESS
  readonly data: ISuccessRegistrationData
}

export const fetchRegistration = (email: string, password: string, name: string) => {
  return function(dispatch: Dispatch) {
    dispatch({ type: REGISTRATION_REQUEST });

    const data = { "email": email, "password": password, "name": name }

    fetch(REGISTRATION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(checkResponse)
      .then(result => {
        if (result.success) {
          localStorage.setItem('refreshToken', result.refreshToken);
          localStorage.setItem('accessToken', result.accessToken);
          dispatch({ type: REGISTRATION_SUCCESS, data: result })
        }
      })
      .catch(err => dispatch({ type: REGISTRATION_ERROR }))
  }
}


// ----- Авторизация ----
export const AUTH_REQUEST: 'AUTH_REQUEST' = 'AUTH_REQUEST';
export const AUTH_ERROR: 'AUTH_ERROR' = 'AUTH_ERROR';
export const AUTH_SUCCESS: 'AUTH_SUCCESS' = 'AUTH_SUCCESS';

export interface IAuthRequestAction {
  readonly type: typeof AUTH_REQUEST
}

export interface IAuthErrorAction {
  readonly type: typeof AUTH_ERROR
}

export interface IAuthSuccessAction {
  readonly type: typeof AUTH_SUCCESS
  readonly data: ISuccessRegistrationData
}

export const fetchAuthorization = (email: string, password: string) => {
  return function(dispatch: Dispatch) {
    
    dispatch({ type: AUTH_REQUEST });

    const data = { "email": email, "password": password }

    fetch(LOGIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(checkResponse)
      .then(result => {
        if (result.success) {
          localStorage.setItem('refreshToken', result.refreshToken);
          localStorage.setItem('accessToken', result.accessToken.split('Bearer ')[1]);
          dispatch({ type: AUTH_SUCCESS, data: result })
        }
      })
      .catch(err => dispatch({ type: AUTH_ERROR }))
  }
}

// ------ Обновление токена -----
export const REFRESH_TOKEN_REQUEST: 'REFRESH_TOKEN_REQUEST' = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_ERROR: 'REFRESH_TOKEN_ERROR' = 'REFRESH_TOKEN_ERROR';
export const REFRESH_TOKEN_SUCCESS: 'REFRESH_TOKEN_SUCCESS' = 'REFRESH_TOKEN_SUCCESS';

export interface IRefreshTokenRequestAction {
  readonly type: typeof REFRESH_TOKEN_REQUEST
}

export interface IRefreshTokenErrorAction {
  readonly type: typeof REFRESH_TOKEN_ERROR
}

export interface IRefreshTokenSuccessAction {
  readonly type: typeof REFRESH_TOKEN_SUCCESS
  readonly data: IRefreshTokenData
}

export const refreshToken = (nextAction: TAnyFunction) => {
  
  return function(dispatch: Dispatch) {
    dispatch({ type: REFRESH_TOKEN_REQUEST });

    fetch(REFRESH_TOKEN_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken')
      })
    })
      .then(checkResponse)
      .then(result => {
        if (result.success) {
          localStorage.setItem('refreshToken', result.refreshToken);
          localStorage.setItem('accessToken', result.accessToken.split('Bearer ')[1]);
          dispatch({ type: REFRESH_TOKEN_SUCCESS, data: result })
          dispatch(nextAction)
        }
      })
      .catch(err => err === 'Token is invalid' ? dispatch(logout()) : console.error(err))
  }
}


// ----- Информация о пользователе ----
export const GET_USER_REQUEST: 'GET_USER_REQUEST' = 'GET_USER_REQUEST';
export const GET_USER_ERROR: 'GET_USER_ERROR' = 'GET_USER_ERROR';
export const GET_USER_SUCCESS: 'GET_USER_SUCCESS' = 'GET_USER_SUCCESS';

export interface IGetUserRequestAction {
  readonly type: typeof GET_USER_REQUEST
}

export interface IGetUserErrorAction {
  readonly type: typeof GET_USER_ERROR
}

export interface IGetUserSuccessAction {
  readonly type: typeof GET_USER_SUCCESS
  readonly data: IUserRegistrationData
}

export const getUser
 = () => {
  return function(dispatch: Dispatch) {
    dispatch({ type: GET_USER_REQUEST });

    fetch(GET_USER_URL, {
      headers: {
        "Authorization": 'Bearer ' + localStorage.getItem('accessToken'),
      }
    })
      .then(checkResponse)
      .then(result => dispatch({ type: GET_USER_SUCCESS, data: result.user }))
      .catch(err => err === 'jwt expired' ? dispatch(refreshToken(getUser())) : console.error(err))
  }
}

// ----- Редактирование информации о пользователе ----
export const PATCH_USER_REQUEST: 'PATCH_USER_REQUEST' = 'PATCH_USER_REQUEST';
export const PATCH_USER_ERROR: 'PATCH_USER_ERROR' = 'PATCH_USER_ERROR';
export const PATCH_USER_SUCCESS: 'PATCH_USER_SUCCESS' = 'PATCH_USER_SUCCESS';
export const IS_DATA_USER_UPDATED: 'IS_DATA_USER_UPDATED' = 'IS_DATA_USER_UPDATED';

export interface IPatchUserRequestAction {
  readonly type: typeof PATCH_USER_REQUEST
}

export interface IPatchUserErrorAction {
  readonly type: typeof PATCH_USER_ERROR
}

export interface IPatchUserSuccessAction {
  readonly type: typeof PATCH_USER_SUCCESS
  readonly data: IUserRegistrationData
}

export interface IIsDataUserUpdatesAction {
  readonly type: typeof IS_DATA_USER_UPDATED
}

export const patchUser = (user: IUserData) => {
  return function(dispatch: Dispatch) {
    dispatch({ type: PATCH_USER_REQUEST });

    const data = { "email": user.email, "password": user.password, "name": user.name }
  
    fetch(PATCH_USER_URL, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": 'Bearer ' + localStorage.getItem('accessToken'),
      },
      body: JSON.stringify(data)
    })
      .then(checkResponse)
      .then(result => {
        if (!result.success && result.message === "jwt expired") {
          refreshToken(patchUser(user))
        }
        if (result.success) {
          dispatch({ type: PATCH_USER_SUCCESS, data: result.user })
        }
      })
      .catch(err => dispatch({ type: PATCH_USER_ERROR }))
  }
}


// ----- Выход из системы ----
export const LOGOUT_REQUEST: 'LOGOUT_REQUEST' = 'LOGOUT_REQUEST';
export const LOGOUT_ERROR: 'LOGOUT__ERROR' = 'LOGOUT__ERROR';
export const LOGOUT_SUCCESS: 'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS';

export interface ILogoutRequestAction {
  readonly type: typeof LOGOUT_REQUEST
}

export interface ILogoutErrorAction {
  readonly type: typeof LOGOUT_ERROR
}

export interface ILogoutSuccessAction {
  readonly type: typeof LOGOUT_SUCCESS
}

export const logout = () => {
  return function(dispatch: Dispatch) {
    dispatch({ type: LOGOUT_REQUEST });

    fetch(LOGOUT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "token": localStorage.getItem('refreshToken') })
    })
      .then(checkResponse)
      .then(result => {
        if (result.success) {
          dispatch({ type: LOGOUT_SUCCESS })
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        }
      })
      .catch(err => dispatch({ type: LOGOUT_ERROR }))
  }
}

export type TAuthActions = 
  | IRegistrationRequestAction
  | IRegistrationRequestError
  | IRegistrationSuccessAction
  | IAuthRequestAction
  | IAuthErrorAction
  | IAuthSuccessAction
  | IRefreshTokenRequestAction
  | IRefreshTokenErrorAction
  | IRefreshTokenSuccessAction
  | IGetUserRequestAction
  | IGetUserErrorAction
  | IGetUserSuccessAction
  | IPatchUserRequestAction
  | IPatchUserErrorAction
  | IPatchUserSuccessAction
  | IIsDataUserUpdatesAction
  | ILogoutRequestAction
  | ILogoutErrorAction
  | ILogoutSuccessAction
