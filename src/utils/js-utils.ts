import { IIngredient } from '../types/common';

export const checkResponse = (res: any) => {
  if (res.ok) {
    return res.json();
  }

  return res.json().then((result: any) => {
    if (result.message) {
      return Promise.reject(result.message);
    } else {
      return Promise.reject(res)
    }
  });




}

export const isObjectEmpty = (obj: IIngredient | {}) => {
  for (let key in obj) {
    return false;
  }
  return true;
}

export const randomKeyGenerate = () => {
  return Math.random().toString(36).substr(2, 9);
}

export const dateConverter = (date: string) => {
  return new Date(date).toLocaleString("ru", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
  })
}

export const ingredientPanelIndex = (index: number) => {
  let zIndex;
  if (index === 1) {
    zIndex = 5;
  } else if (index === 2) {
    zIndex = 4;
  }
  else if (index === 3) {
    zIndex = 3;
  }
  else if (index === 4) {
    zIndex = 2;
  }
  else if (index === 5) {
    zIndex = 1;
  }
  else {
    zIndex = 0;
  }

  return zIndex;
}

export const getOrderStatusName = (status: string) => {
  return status === 'done' ? 'Выполнен' : status === 'pending' ? 'Готовится' : status === 'cancelled' ? 'Отменен' : ''
}

export const priceCounter = (ingretients: string[], allIngredients: IIngredient[]) => {
  const price = ingretients.reduce((sum, current) => {
    const value = allIngredients.find(item => item._id === current)!.price
    return sum + value
  }, 0
  )
  return price
}