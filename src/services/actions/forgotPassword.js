import { FORGOT_PASSWORD_URL, RESET_PASSWORD_URL } from '../../constants/constants';

// FORGOT PASSWORD - Первичный запрос на сброс пароля
export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR';

export const fetchForgotPasswort = (email) => {
  return function(dispatch) {
    
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
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR';

export const fetchResetPassword = (newPassword, code) => {
  return function(dispatch) {
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