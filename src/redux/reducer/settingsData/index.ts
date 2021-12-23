/*
 * @Author: your name
 * @Date: 2021-12-11 21:50:25
 * @LastEditTime: 2021-12-23 17:50:21
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \byte_project\src\redux\reducer\settingsData\index.ts
 */
import { createSlice } from '@reduxjs/toolkit';
import { IAction } from '../types'

const settingsData = createSlice({
  name: 'settingsData',
  initialState: {
    theme: '',
    fontSize: '',
    themeColor: ''
  },
  reducers: {
    setTheme: (state, action: IAction) => {
      const { payload } = action;
      state.theme = payload.theme
    }
  }
})
export default settingsData.reducer;