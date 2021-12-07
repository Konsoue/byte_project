import { useReducer } from "react";
import Header from '@/common/Header';
import { IHomeAction, IHomeState } from './types'
import NewsList from '@/common/NewsList';
import './index.scss';

const initialState = {
  flash: false,
}

const homeReducer = (state: IHomeState, action: IHomeAction) => {
  switch (action.type) {
    case 'flash':
      return {
        ...state,
        flash: !state.flash
      }
    default: return state
  }
}

function Home() {
  const [state, dispatch] = useReducer(homeReducer, initialState)

  return (
    <div>
      <Header toFlash={dispatch} flash={state.flash} />
      <article className="article-container">
        <NewsList flash={state.flash} toFlash={dispatch} />
      </article>
    </div>
  );
}

export default Home;
