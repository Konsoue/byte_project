import { useMemo, useEffect } from 'react'
import NewsCard from "@/common/NewsCard";
import { INewsListProps, INewsList, IResponceResult } from './types'
import useFetch from '@/hooks/useFetch';
import { newsUrl } from '@/Utils/urls'
import { SS } from '@/Utils'
import './index.scss'

let current = 1;

const NewsList: React.FC<INewsListProps> = (props) => {
  const { flash, toFlash } = props;

  const { run: getNewsDigest, data: newsDigest, loading: newsLoad } = useFetch({
    url: newsUrl.getNewsDigest,
    type: 'get'
  })
  /**
   * 缓存新闻列表
   */
  const newsList = useMemo(() => {
    return SS.getItem('newsDigest') as INewsList[] || [];
  }, [flash]);

  /**
   * 获取更多的新闻
   */
  const getMoreNews = () => {
    const type = SS.getItem('newsType');
    getNewsDigest({ type, current: ++current })
  }

  useEffect(() => {
    if (newsDigest) {
      const oldData = SS.getItem('newsDigest');
      const { data: { records: data } } = newsDigest as IResponceResult;
      SS.setItem('newsDigest', [...oldData, ...data]);
      toFlash?.({ type: 'flash' });
    }
  }, [newsDigest])

  return (
    <div className="newslist-container">
      {newsList?.map((news: INewsList) => (
        <NewsCard
          key={news._id}
          title={news.title}
          img={news.img}
          content={news.digest}
          time={news.publishTime}
          source={news.source}
        />
      ))}
      <section className="more-contianer">
        <div className="more-news" onClick={getMoreNews}>
          <span className="more-icon">
            <svg className={`${newsLoad && 'animate__rotateIn'}`} width="48" height="48" viewBox="0 0 48 48" fill="none"><path d="M42 24c0 9.941-8.059 18-18 18S6 33.941 6 24 14.059 6 24 6" stroke="rgb(162,53,17)" strokeWidth="4" /></svg>
          </span>
          <span className="more-word">{newsLoad ? '正在加载' : '点击加载更多'}</span>
        </div>
      </section>
    </div>
  )
}

export default NewsList;