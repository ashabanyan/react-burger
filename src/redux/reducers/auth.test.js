import { authReducer } from './auth';
import * as types from '../actions/auth';
import { authReducerInitialState, sendDataToRegistrationSuccess, sendDataToRefreshTokenSuccess } from '../../constants/test-constants/reducer';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual(authReducerInitialState)
  })

  // ---------- Registration ----------
  it('should handle REGISTRATION_REQUEST', () => {
    expect(authReducer(undefined, { type: types.REGISTRATION_REQUEST })).toEqual({
      ...authReducerInitialState, 
      registrationRequest: true,
      registrationError: false,
    })
  })

  it('should handle REGISTRATION_ERROR', () => {
    expect(authReducer(undefined, { type: types.REGISTRATION_ERROR })).toEqual({
      ...authReducerInitialState, 
      registrationRequest: false,
      registrationError: true,
    })
  })

  it('should handle REGISTRATION_SUCCESS', () => {
    expect(authReducer(undefined, { type: types.REGISTRATION_SUCCESS, data: sendDataToRegistrationSuccess })).toEqual({
      ...authReducerInitialState, 
      registrationRequest: false,
      registrationError: false,
      user: sendDataToRegistrationSuccess.user,
      accessToken: sendDataToRegistrationSuccess.accessToken,
      refreshToken: sendDataToRegistrationSuccess.refreshToken,
    })
  })

  // ---------- Authorization ----------
  it('should handle AUTH_REQUEST', () => {
    expect(authReducer(undefined, { type: types.AUTH_REQUEST })).toEqual({
      ...authReducerInitialState, 
      authRequest: true,
      authError: false,
    })
  })

  it('should handle AUTH_ERROR', () => {
    expect(authReducer(undefined, { type: types.AUTH_ERROR })).toEqual({
      ...authReducerInitialState, 
      authRequest: false,
      authError: true,
    })
  })

  it('should handle AUTH_SUCCESS', () => {
    expect(authReducer(undefined, { type: types.AUTH_SUCCESS, data: sendDataToRegistrationSuccess })).toEqual({
      ...authReducerInitialState, 
      authRequest: false,
      authError: false,
      user: sendDataToRegistrationSuccess.user,
      accessToken: sendDataToRegistrationSuccess.accessToken,
      refreshToken: sendDataToRegistrationSuccess.refreshToken,
      isLoading: false,
    })
  })

  // ---------- Token Refresh ----------
  it('should handle REFRESH_TOKEN_REQUEST', () => {
    expect(authReducer(undefined, { type: types.REFRESH_TOKEN_REQUEST })).toEqual({
      ...authReducerInitialState, 
      refreshTokenRequest: true,
      refreshTokenError: false,
    })
  })

  it('should handle REFRESH_TOKEN_ERROR', () => {
    expect(authReducer(undefined, { type: types.REFRESH_TOKEN_ERROR })).toEqual({
      ...authReducerInitialState, 
      refreshTokenRequest: false,
      refreshTokenError: true,
    })
  })

  it('should handle REFRESH_TOKEN_SUCCESS', () => {
    expect(authReducer(undefined, { type: types.REFRESH_TOKEN_SUCCESS, data: sendDataToRefreshTokenSuccess })).toEqual({
      ...authReducerInitialState, 
      refreshTokenRequest: false,
      refreshTokenError: false,
      refreshToken: sendDataToRefreshTokenSuccess.refreshToken,
      accessToken: sendDataToRefreshTokenSuccess.accessToken,
    })
  })

  // ---------- Get User ----------
  it('should handle GET_USER_REQUEST', () => {
    expect(authReducer(undefined, { type: types.GET_USER_REQUEST })).toEqual({
      ...authReducerInitialState, 
      getUserRequest: true,
      getUserError: false,
    })
  })

  it('should handle GET_USER_ERROR', () => {
    expect(authReducer(undefined, { type: types.GET_USER_ERROR })).toEqual({
      ...authReducerInitialState, 
      getUserRequest: false,
      getUserError: true,
    })
  })

  it('should handle GET_USER_SUCCESS', () => {
    expect(authReducer(undefined, { type: types.GET_USER_SUCCESS, data: sendDataToRegistrationSuccess.user })).toEqual({
      ...authReducerInitialState, 
      getUserRequest: false,
      getUserError: false,
      user: sendDataToRegistrationSuccess.user,
      isLoading: false,
    })
  })

  // ---------- Patch User ----------
  it('should handle PATCH_USER_REQUEST', () => {
    expect(authReducer(undefined, { type: types.PATCH_USER_REQUEST })).toEqual({
      ...authReducerInitialState, 
      patchUserRequest: true,
      patchUserError: false,
    })
  })

  it('should handle PATCH_USER_ERROR', () => {
    expect(authReducer(undefined, { type: types.PATCH_USER_ERROR })).toEqual({
      ...authReducerInitialState, 
      patchUserRequest: false,
      patchUserError: true,
    })
  })

  it('should handle PATCH_USER_SUCCESS', () => {
    expect(authReducer(undefined, { type: types.PATCH_USER_SUCCESS, data: sendDataToRegistrationSuccess.user })).toEqual({
      ...authReducerInitialState, 
      patchUserRequest: false,
      patchUserError: false,
      isUserDataUpdated: true,
      user: sendDataToRegistrationSuccess.user,
    })
  })

  it('should handle IS_DATA_USER_UPDATED', () => {
    expect(authReducer(undefined, { type: types.IS_DATA_USER_UPDATED })).toEqual({
      ...authReducerInitialState, 
      isUserDataUpdated: false
    })
  })

  // ---------- Logout ----------

  it('should handle LOGOUT_REQUEST', () => {
    expect(authReducer(undefined, { type: types.LOGOUT_REQUEST })).toEqual({
      ...authReducerInitialState, 
      logoutRequest: true,
      logoutError: false,
    })
  })

  it('should handle LOGOUT_ERROR', () => {
    expect(authReducer(undefined, { type: types.LOGOUT_ERROR })).toEqual({
      ...authReducerInitialState, 
      logoutRequest: false,
      logoutError: true,
    })
  })

  
  it('should handle LOGOUT_SUCCESS', () => {
    expect(authReducer(undefined, { type: types.LOGOUT_SUCCESS })).toEqual({
      ...authReducerInitialState, 
      logoutRequest: false,
      logoutError: false,
      user: null,
      accessToken: null,
      refreshToken: null,
      isLoading: false,
    })
  })
})