import { forgotPasswordReducer } from './forgotPassword';
import * as types from '../actions/forgotPassword';
import { forgotPasswordReducerInitialState } from '../../constants/test-constants/reducer';

describe('forgotPassword reducer', () => {
  it('should return the initial state', () => {
    expect(forgotPasswordReducer(undefined, {})).toEqual(forgotPasswordReducerInitialState)
  })

  // ---------- Forgot Passwords ----------
  it('should handle FORGOT_PASSWORD_REQUEST', () => {
    expect(forgotPasswordReducer(undefined, { type: types.FORGOT_PASSWORD_REQUEST })).toEqual({
      ...forgotPasswordReducerInitialState, 
      forgotPasswordRequest: true,
      forgotPasswordError: false,
    })
  })

  it('should handle FORGOT_PASSWORD_ERROR', () => {
    expect(forgotPasswordReducer(undefined, { type: types.FORGOT_PASSWORD_ERROR })).toEqual({
      ...forgotPasswordReducerInitialState, 
      forgotPasswordRequest: false,
      forgotPasswordError: true,
      forgotPasswordStatus: false,
    })
  })

  it('should handle FORGOT_PASSWORD_SUCCESS', () => {
    expect(forgotPasswordReducer(undefined, { type: types.FORGOT_PASSWORD_SUCCESS })).toEqual({
      ...forgotPasswordReducerInitialState, 
      forgotPasswordRequest: false,
      forgotPasswordError: false,
      forgotPasswordStatus: true,
      recoveryStage: 1
    })
  })

  // ---------- Reset Passwords ----------
  it('should handle RESET_PASSWORD_REQUEST', () => {
    expect(forgotPasswordReducer(undefined, { type: types.RESET_PASSWORD_REQUEST })).toEqual({
      ...forgotPasswordReducerInitialState, 
      resetPasswordRequest: true,
      resetPasswordError: false,
    })
  })

  it('should handle RESET_PASSWORD_ERROR', () => {
    expect(forgotPasswordReducer(undefined, { type: types.RESET_PASSWORD_ERROR })).toEqual({
      ...forgotPasswordReducerInitialState, 
      resetPasswordRequest: false,
      resetPasswordStatus: false,
      resetPasswordError: true,
    })
  })

  it('should handle RESET_PASSWORD_SUCCESS', () => {
    expect(forgotPasswordReducer(undefined, { type: types.RESET_PASSWORD_SUCCESS })).toEqual({
      ...forgotPasswordReducerInitialState, 
      resetPasswordRequest: false,
      resetPasswordError: false,
      resetPasswordStatus: true,
    })
  })
})