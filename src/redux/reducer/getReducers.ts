import { is } from '@/Utils'
import { IReducers } from './types'


class ReducerMethod {
  requireReducers() {
    const reducerCtx = require.context("./", true, /index.ts/);
    const reducers = {} as IReducers;
    for (const path of reducerCtx.keys()) {
      const reducerFn = reducerCtx(path).default;
      const key = path.replace('/index.ts', '').replace('./', '') as string;
      if (is.Function(reducerFn)) reducers[key] = reducerFn
    }
    return reducers
  }
}

export const reducerMethod = new ReducerMethod();
