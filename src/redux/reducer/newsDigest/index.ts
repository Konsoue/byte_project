import { createSlice } from '@reduxjs/toolkit';
import { IAction } from '../types'

const newsDigest = createSlice({
  name: 'newsDigest',
  initialState: {
    data: {
      news: [],
      current: 1
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

export default newsDigest.reducer;