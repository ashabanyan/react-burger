import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";
import { RootState } from "./types";
import { ThunkAction } from "redux-thunk";
import { TApplicationActions } from "./types/index";

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  TApplicationActions
>;
export type Dispatch = <TReturnType = void>(
  action: TApplicationActions | AppThunk
) => TReturnType;

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch = () => dispatchHook<Dispatch>();