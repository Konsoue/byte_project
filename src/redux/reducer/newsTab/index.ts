import { createSlice } from '@reduxjs/toolkit';
import { IAction } from '../types'

const defaultTabs = [
  {
    name: '推荐',
    id: '1'
  },
  {
    name: '热点',
    id: '2'
  },
  {
    name: '科技',
    id: '3'
  },
]

const newsTab = createSlice({
  name: 'newsTab',
  initialState: {
    data: {
      newsType: defaultTabs,
      id: false,
    },
  },
  reducers: {
    setData: (state, action: IAction) => {
      const { payload } = action;
      state.data = {
        ...state.data,
        ...payload
      }
    }
  }
})

export default newsTab.reducer;