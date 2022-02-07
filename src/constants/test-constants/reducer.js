// ---------- MakingOrder Reducer ----------
export const newCreatedOrderData = {
  name: "Space флюоресцентный бургер",
  order: {
    createdAt: "2022-02-07T11:31:09.537Z",
    ingredients: [],
    name: "Space флюоресцентный бургер",
    number: 9627,
    owner: {name: 'test_user', email: 'test@yandex.ru', createdAt: '2021-12-22T15:56:48.547Z', updatedAt: '2022-01-24T13:22:34.833Z'},
    price: 1068,
    status: "done",
    updatedAt: "2022-02-07T11:31:09.836Z",
    _id: "620102fd6d7cd8001b2d486e",
  },
  success: true
}

// ---------- Auth Reducer ----------
export const authReducerInitialState = {
  isLoading: true,
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

  user: null,
  accessToken: null,
  refreshToken: null,
}

export const sendDataToRegistrationSuccess = {
  accessToken: '123123123',
  refreshToken: '321321321',
  success: true,
  user: {
    name: 'Тест',
    email: 'test@yandex.ru'
  },
}

export const sendDataToRefreshTokenSuccess = {
  accessToken: '123123123',
  refreshToken: '321321321',
  success: true,
}

// ---------- forgotPassword Reducer ----------
export const forgotPasswordReducerInitialState = {
  forgotPasswordRequest: false,
  forgotPasswordStatus: false,
  forgotPasswordError: false,

  resetPasswordRequest: false,
  resetPasswordStatus: false,
  resetPasswordError: false,

  recoveryStage: null,
}

// ---------- Ingredients Reducer ----------
export const ingredientsReducerInitialState = {
  ingRequest: false,
  ingError: false,
  allIngredients: null,
  currentViewIngredient: null,
}

export const ingredientsSuccessObject = {
  calories: 14,
  carbohydrates: 11,
  fat: 22,
  image: "https://code.s3.yandex.net/react/code/sauce-04.png",
  image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
  image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
  name: "Соус фирменный Space Sauce",
  price: 80,
  proteins: 50,
  type: "sauce",
  __v: 0,
  _id: "60d3b41abdacab0026a733cd",
  id: "c4ravatt5"
}

export const ingredientsBunSuccessObject = {
  calories: 14,
  carbohydrates: 11,
  fat: 22,
  image: "https://code.s3.yandex.net/react/code/sauce-04.png",
  image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
  image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
  name: "Соус фирменный Space Sauce",
  price: 80,
  proteins: 50,
  type: "bun",
  __v: 0,
  _id: "60d3b41abdacab0026a733cd",
}

export const ingredientsSuccessData = [ingredientsSuccessObject]

export const currentModalIngredientId = "60d3b41abdacab0026a733cd";

// ---------- Order Constroctor Reducer ----------
export const orderConstructorReducerInitialState = {
  currentOrderBun: null,
  currentOrderIngredients: null,
}

// ---------- wsReducer ----------
export const wsReducerInitialState = {
  messages: null,
  isConnected: false,
  isFailed: false,
  total: null,
  totalToday: null,
  isFirstLoading: false,
}

export const messageArray = [
  {
    _id: "620102fd6d7cd8001b2d486e",
    ingredients: ["60d3b41abdacab0026a733cd", "60d3b41abdacab0026a733c7"],
    status: "done",
    name:"Space флюоресцентный бургер",
    createdAt:"2022-02-07T11:31:09.537Z",
    updatedAt:"2022-02-07T11:31:09.836Z",
    number:9627,
  }
]

export const getMessagesData = {
  orders: messageArray,
  success: true,
  total: 1000,
  totalToday: 100,
}