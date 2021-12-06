import React, { useReducer, useMemo } from "react";
// import useFetch from '@/hooks/useFetch';
// import { userUrl } from '@/Utils/urls'
import Header from '@/common/Header';
import NewsCard from "@/common/newsCard";
import { IHomeAction, IHomeState, INewsList } from './types'
import { SS } from '@/Utils'
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
  const newsList = useMemo(() => {
    return SS.getItem('newsDigest') as INewsList[] || [];
  }, [state.flash])
  return (
    <div>
      <Header toFlash={dispatch} />
      <article className="article-container">
        {newsList.map((news: INewsList) => (
          <NewsCard
            id={news._id}
            title={news.title}
            img={news.img}
            content={news.digest}
          />
        ))}
      </article>
    </div>
  );
}

export default Home;
