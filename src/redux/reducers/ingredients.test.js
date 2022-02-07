import { ingredientReducer } from './ingredients';
import * as types from '../actions/ingredients';
import { ingredientsReducerInitialState, ingredientsSuccessData, currentModalIngredientId, ingredientsSuccessObject } from '../../constants/test-constants/reducer';

describe('ingredients reducer', () => {
  it('should return the initial state', () => {
    expect(ingredientReducer(undefined, {})).toEqual(ingredientsReducerInitialState)
  })

  it('should handle GET_INGREDIENTS_REQUEST', () => {
    expect(ingredientReducer(undefined, { type: types.GET_INGREDIENTS_REQUEST })).toEqual({
      ...ingredientsReducerInitialState, 
      ingRequest: true,
      ingError: false,
    })
  })

  it('should handle GET_INGREDIENTS_FAILED', () => {
    expect(ingredientReducer(undefined, { type: types.GET_INGREDIENTS_FAILED })).toEqual({
      ...ingredientsReducerInitialState, 
      ingRequest: false,
      ingError: true,
    })
  })

  it('should handle GET_INGREDIENTS_SUCCESS', () => {
    expect(ingredientReducer(undefined, { type: types.GET_INGREDIENTS_SUCCESS, ingredientsData: ingredientsSuccessData })).toEqual({
      ...ingredientsReducerInitialState, 
      ingRequest: false,
      ingError: false,
      allIngredients: ingredientsSuccessData
    })
  })

  it('should handle SET_INGREDIENT_MODAL_DATA', () => {
    expect(ingredientReducer({...ingredientsReducerInitialState, allIngredients: ingredientsSuccessData}, { type: types.SET_INGREDIENT_MODAL_DATA, id: currentModalIngredientId })).toEqual({
      ...ingredientsReducerInitialState, 
      allIngredients: ingredientsSuccessData,
      currentViewIngredient: ingredientsSuccessObject,
    })
  })

  it('should handle DELETE_INGREDIENT_MODAL_DATA', () => {
    expect(ingredientReducer(undefined, { type: types.DELETE_INGREDIENT_MODAL_DATA })).toEqual({
      ...ingredientsReducerInitialState, 
      currentViewIngredient: null
    })
  })
})