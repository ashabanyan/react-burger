import { IIngredient } from '../types/common';

export const isObjectEmpty = (obj: IIngredient | {}) => {
  for (let key in obj) {
    return false;
  }
  return true;
}

export const randomKeyGenerate = () => {
  return Math.random().toString(36).substr(2, 9);
}