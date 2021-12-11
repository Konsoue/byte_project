import { configureStore } from '@reduxjs/toolkit';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { ISelectState } from './types'
import { is } from '@/Utils'
import reducers from './reducer'

const selectReduxData = (state: ISelectState, selectArray: string[]): any => {
  let res = state;
  for (let key of selectArray) {
    res = res[key];
    if (is.Undefined(res)) return null;
  }
  return res;
}

/**
 * 获取redux中的某一项
 * @param {string array} selectArray
 */
export const useReduxData = (selectArray: string[]): any => {
  const data = useSelector(
    state => selectReduxData(state, selectArray),
    shallowEqual
  )
  return data
}

export const useReduxDispatch = useDispatch;
const store = configureStore({
  reducer: {
    ...reducers
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export default store;