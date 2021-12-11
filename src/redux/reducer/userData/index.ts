import { createSlice } from '@reduxjs/toolkit';
import { IAction } from '../types'

const userData = createSlice({
  name: 'userData',
  initialState: {
    data: {
      login: false,
      name: '',
      avatar: ''
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

export default userData.reducer;