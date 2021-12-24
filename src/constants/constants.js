export const BASE_URL = "https://norma.nomoreparties.space/api"

export const GET_ORDER_NUMBER_URL = BASE_URL + "/orders";

export const GET_INGREDIENTS_URL = BASE_URL + "/ingredients";
export const FORGOT_PASSWORD_URL = BASE_URL + "/password-reset";
export const RESET_PASSWORD_URL = BASE_URL + "/password-reset/reset";

export const LOGIN_URL = BASE_URL + "/auth/login";
export const REGISTRATION_URL = BASE_URL + "/auth/register";
export const LOGOUT_URL = BASE_URL + "/auth/logout";
export const REFRESH_TOKEN_URL = BASE_URL + "/auth/token";

export const GET_USER_URL = BASE_URL + '/auth/user';
export const PATCH_USER_URL = BASE_URL + '/auth/user';


export const tab_items = ["Булки", "Соусы", "Начинки"];

export const DND_TYPES = {
  ingredient: 'ingredient',
  sortable_ingredient: 'sortable_ingredient',
}

export const PROFILE_PAGE_TYPES = {
  ProfilePage: 'profile',
  HistoryPage: 'history',
}