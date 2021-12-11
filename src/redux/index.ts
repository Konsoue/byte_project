/*
 * @Author: your name
 * @Date: 2021-12-11 18:06:13
 * @LastEditTime: 2021-12-11 21:47:37
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \byte_project\src\redux\index.ts
 */
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