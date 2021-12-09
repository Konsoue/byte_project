/*
 * @Author: your name
 * @Date: 2021-12-06 21:39:41
 * @LastEditTime: 2021-12-07 22:27:16
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \byte_project\src\pages\home\index.tsx
 */
import { useReducer } from "react";
import Header from '@/common/Header';
import { IHomeAction, IHomeState } from './types'
import NewsList from '@/common/NewsList';
import './index.scss';

const initialState = {
  flash: false,
};

const homeReducer = (state: IHomeState, action: IHomeAction) => {
  switch (action.type) {
    case "flash":
      return {
        ...state,
        flash: !state.flash,
      };
    default:
      return state;
  }
};

function Home() {
  const [state, dispatch] = useReducer(homeReducer, initialState)

  return (
    <div id="home-container">
      <Header toFlash={dispatch} flash={state.flash} />
      <article className="article-container">
        <NewsList flash={state.flash} toFlash={dispatch} />
      </article>
    </div>
  );
}

export default Home;
