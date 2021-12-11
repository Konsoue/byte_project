import { Reducer, AnyAction } from 'redux'
export interface IAction {
  payload?: any;
  type: string;
}

export interface IReducers {
  [key: string]: Reducer<unknown, AnyAction>;
}