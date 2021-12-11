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
    },
    setFontSize: (state, action: IAction) => {
      const { payload } = action;
      state.fontSize = payload.fontSize
    },
    setThemeColor: (state, action: IAction) => {
      const { payload } = action;
      state.themeColor = payload.themeColor
    }
  }
})
export default settingsData.reducer;