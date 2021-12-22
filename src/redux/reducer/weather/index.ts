import { createSlice } from '@reduxjs/toolkit';
import { IAction } from '../types'

const weather = createSlice({
  name: 'weather',
  initialState: {
    data: {
      text: '',

    },
  },
  reducers: {
    setData: (state, action: IAction) => {
      const { payload } = action;
      state.data = {
        ...state.data,
        ...payload
      };
    }
  }
})

export default weather.reducer;