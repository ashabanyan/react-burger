import { LOGIN_URL, REGISTRATION_URL, LOGOUT_URL, REFRESH_TOKEN_URL, GET_USER_URL, PATCH_USER_URL  } from '../../constants/constants';

// ----- Регистрация ----
export const REGISTRATION_REQUEST = 'REGISTRATION REQUEST';
export const REGISTRATION_SUCCESS = 'REGISTRATION SUCCESS';
export const REGISTRATION_ERROR = 'REGISTRATION ERROR';

export const fetchRegistration = (email, password, name) => {
  return function(dispatch) {
    dispatch({ type: REGISTRATION_REQUEST });

    const data = { "email": email, "password": password, "name": name }

    fetch(REGISTRATION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
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
export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_ERROR = 'AUTH_ERROR';

export const fetchAuthorization = (email, password) => {
  return function(dispatch) {
    dispatch({ type: AUTH_REQUEST });

    const data = { "email": email, "password": password }

    fetch(LOGIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
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
export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_ERROR = 'REFRESH_TOKEN_ERROR';

export const refreshToken = (nextAction) => {
  return function(dispatch) {
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
      .then(res => {
        return res.json()
      })
      .then(result => {
        if (result.success) {
          dispatch({ type: REFRESH_TOKEN_SUCCESS, data: result })
          dispatch(nextAction)
        }
      })
      .catch(err => dispatch({ type: REFRESH_TOKEN_ERROR }))
  }
}


// ----- Информация о пользователе ----
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_ERROR = 'GET_USER_ERROR';

export const getUser = () => {
  return function(dispatch) {
    dispatch({ type: GET_USER_REQUEST });

    fetch(GET_USER_URL, {
      headers: {
        "Authorization": 'Bearer ' + localStorage.getItem('accessToken'),
      }
    })
      .then(res => res.json())
      .then(result => {
        if (!result.success && result.message === "jwt expired") {
          dispatch(refreshToken(getUser()))
        }
        if (result.success) {
          dispatch({ type: GET_USER_SUCCESS, data: result.user })
        }
      })
      .catch(err => dispatch({ type: GET_USER_ERROR }))
  }
}


// ----- Редактирование информации о пользователе ----
export const PATCH_USER_SUCCESS = 'PATCH_USER_SUCCESS';
export const PATCH_USER_ERROR = 'PATCH_USER_ERROR';
export const PATCH_USER_REQUEST = 'PATCH_USER_REQUEST';
export const IS_DATA_USER_UPDATED = 'IS_DATA_USER_UPDATED';

export const patchUser = (user) => {
  return function(dispatch) {
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
      .then(res => res.json())
      .then(result => {
        if (!result.success && result.message === "jwt expired") {
          dispatch(refreshToken(patchUser()))
        }
        if (result.success) {
          dispatch({ type: PATCH_USER_SUCCESS, data: result.user })
        }
      })
      .catch(err => dispatch({ type: PATCH_USER_ERROR }))
  }
}


// ----- Выход из системы ----
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT__ERROR';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';

export const logout = () => {
  return function(dispatch) {
    dispatch({ type: LOGOUT_REQUEST });

    fetch(LOGOUT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "token": localStorage.getItem('refreshToken') })
    })
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          dispatch({ type: LOGOUT_SUCCESS })
          localStorage.removeItem('isAuth');
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        }
      })
      .catch(err => dispatch({ type: LOGOUT_ERROR }))
  }
}