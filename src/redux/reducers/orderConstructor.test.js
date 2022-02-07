import { orderConstructorReducer } from './orderConstructor';
import * as types from '../actions/orderConstructor';
import { orderConstructorReducerInitialState, ingredientsBunSuccessObject, ingredientsSuccessObject } from '../../constants/test-constants/reducer';

describe('orderConstructor reducer', () => {
  it('should return the initial state', () => {
    expect(orderConstructorReducer(undefined, {})).toEqual(orderConstructorReducerInitialState)
  })

  it('should handle ADD_INGREDIENT_INTO_ORDER_BUN', () => {
    expect(orderConstructorReducer(undefined, { type: types.ADD_INGREDIENT_INTO_ORDER, ingType: 'bun', data: ingredientsBunSuccessObject  })).toEqual({
      ...orderConstructorReducerInitialState, 
      currentOrderBun: ingredientsBunSuccessObject
    })
  })

  it('should handle ADD_INGREDIENT_INTO_ORDER_NOT_BUN', () => {
    expect(orderConstructorReducer(undefined, { type: types.ADD_INGREDIENT_INTO_ORDER, ingType: 'sauce', data: ingredientsSuccessObject  })).toEqual({
      ...orderConstructorReducerInitialState, 
      currentOrderIngredients: [ingredientsSuccessObject]
    })
  })

  it('should handle DELETE_INGREDIENT_FROM_ORDER', () => {
    expect(orderConstructorReducer(
        {...orderConstructorReducerInitialState, currentOrderIngredients: [ingredientsSuccessObject] },
        { type: types.DELETE_INGREDIENT_FROM_ORDER, ingId: ingredientsSuccessObject.id }
      )).toEqual({
        ...orderConstructorReducerInitialState, 
        currentOrderIngredients: []
      })
  })

  it('should handle UPDATE_ORDER_AFTER_DROP', () => {
    expect(orderConstructorReducer(undefined, { type: types.ADD_INGREDIENT_INTO_ORDER, data: ingredientsSuccessObject  })).toEqual({
      ...orderConstructorReducerInitialState, 
      currentOrderIngredients: [ingredientsSuccessObject]
    })
  })

  it('should handle CLEAR_ORDER', () => {
    expect(orderConstructorReducer(undefined, { type: types.CLEAR_ORDER })).toEqual({
      ...orderConstructorReducerInitialState, 
      currentOrderBun: null,
      currentOrderIngredients: null,
    })
  })
})