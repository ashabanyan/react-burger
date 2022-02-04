import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { initStore } from '../store';
import { rootReducer } from '../reducers/index';
import {TAuthActions} from '../actions/auth';
import {TForgotPasswordActions} from '../actions/forgotPassword';
import {TIngredientsActions} from '../actions/ingredients';
import {TMakingOrderAction} from '../actions/makingOrder';
import {TOrderConstructorActions} from '../actions/orderConstructor';
import {TWsActionsUnionType} from '../actions/wsActions'


const store = initStore();

export type RootState = ReturnType<typeof rootReducer>;

export type TApplicationActions = TAuthActions | TForgotPasswordActions | TIngredientsActions | TMakingOrderAction | TOrderConstructorActions | TWsActionsUnionType;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions> 
  >;

export type AppDispatch = typeof store.dispatch;