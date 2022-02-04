export interface IIngredient {
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: string;
  __v: number;
  _id: string;
  id?: string;
  count?: number;
}

export interface IUserData {
  email: string;
  name: string;
  password: string;
}
export type IUserRegistrationData = Omit<IUserData, "password">

export interface ISuccessRegistrationData {
  accessToken: string;
  refreshToken: string;
  success: boolean;
  user: IUserRegistrationData;
}

export type IRefreshTokenData = Omit<ISuccessRegistrationData, "user">

export interface IOrder2 {
  name: string;
  order: {
    number: number
  };
  success: boolean;
}

export interface IDragItem {
  id: string;
  type: string;
}

export type TAnyFunction = (...args: any[]) => void;

export interface IOrder {
  ingredients: string[];
  name: string;
  _id: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
}