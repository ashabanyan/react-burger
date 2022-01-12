
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
  id?: string
}

export interface IDragItem {
  id: string;
  type: string;
}

export type TAnyFunction = (...args: any[]) => void;