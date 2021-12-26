import {  REGISTRATION_REQUEST, REGISTRATION_SUCCESS, REGISTRATION_ERROR,
          AUTH_REQUEST, AUTH_SUCCESS, AUTH_ERROR,
          REFRESH_TOKEN_REQUEST, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_ERROR,
          GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_ERROR,
          PATCH_USER_REQUEST, PATCH_USER_SUCCESS, PATCH_USER_ERROR, IS_DATA_USER_UPDATED,
          LOGOUT_SUCCESS, LOGOUT_ERROR, LOGOUT_REQUEST
} from '../actions/auth';

const initialState = {
  registrationRequest: false,
  registrationError: false,

  authRequest: false,
  authError: false,

  refreshTokenRequest: false,
  refreshTokenError: false,

  getUserRequest: false,
  getUserError: false,

  patchUserRequest: false,
  patchUserError: false,
  isUserDataUpdated: false,

  logoutRequest: false,
  logoutError: false,

  isAuth: false,
  user: null,
  accessToken: null,
  refreshToken: null,
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // ----- Регистрация -----
    case REGISTRATION_REQUEST: {
      return {
        ...state,
        registrationRequest: true,
        registrationError: false,
      }
    }
    case REGISTRATION_SUCCESS: {
      return {
        ...state,
        registrationRequest: false,
        registrationError: false,
        user: action.data.user,
        accessToken: action.data.accessToken,
        refreshToken: action.data.refreshToken,
        isAuth: true,
      }
    }
    case REGISTRATION_ERROR: {
      return {
        registrationRequest: false,
        registrationError: false,

      }
    }
    // ----- Регистрация -----
    case AUTH_REQUEST: {
      return {
        ...state,
        authRequest: true,
        authError: false,
      }
    }
    case AUTH_SUCCESS: {
      return {
        ...state,
        authRequest: false,
        authError: false,
        user: action.data.user,
        accessToken: action.data.accessToken,
        refreshToken: action.data.refreshToken,
        isAuth: true,
      }
    }
    case AUTH_ERROR: {
      return {
        ...state, 
        authRequest: false,
        authError: true,
      }
    }
    // ----- Рефреш токена -----
    case REFRESH_TOKEN_REQUEST: {
      return {
        ...state, 
        refreshTokenRequest: true,
      }
    }
    case REFRESH_TOKEN_SUCCESS: {
      return {
        ...state, 
        refreshTokenRequest: false,
        refreshTokenError: false,
        refreshToken: action.data.refreshToken,
        accessToken: action.data.accessToken,
      }
    }
    case REFRESH_TOKEN_ERROR: {
      return {
        ...state, 
        refreshTokenRequest: false,
        refreshTokenError: true,
      }
    }
    // ----- Получение данных о пользователе
    case GET_USER_REQUEST: {
      return {
        ...state, 
        getUserRequest: true,
        getUserError: false,
      }
    }
    case GET_USER_SUCCESS: {
      return {
        ...state, 
        getUserRequest: false,
        getUserError: false,
        user: action.data
      }
    }
    case GET_USER_ERROR: {
      return {
        ...state, 
        getUserRequest: false,
        getUserError: true,
      }
    }
    // ----- Редактирование данных о пользователе
    case PATCH_USER_REQUEST: {
      return {
        ...state, 
        patchUserRequest: true,
        patchUserError: false,
      }
    }
    case PATCH_USER_SUCCESS: {
      return {
        ...state, 
        patchUserRequest: false,
        patchUserError: false,
        isUserDataUpdated: true,
        user: action.data
      }
    }
    case PATCH_USER_ERROR: {
      return {
        ...state, 
        patchUserRequest: false,
        patchUserError: true,
      }
    }
    case IS_DATA_USER_UPDATED: {
      return {
        ...state, 
        isUserDataUpdated: false
      }
    }
    case LOGOUT_REQUEST: {
      return {
        ...state, 
        logoutRequest: true,
        logoutError: false,
      }
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state, 
        logoutRequest: false,
        logoutError: false,
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuth: false,
      }
    }
    case LOGOUT_ERROR: {
      return {
        ...state, 
        logoutRequest: false,
        logoutError: true,
      }
    }
    default: return state;
  }
}