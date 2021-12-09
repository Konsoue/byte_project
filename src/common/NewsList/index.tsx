import { useMemo, useEffect, useState, memo } from 'react'
import NewsCard from "@/common/NewsCard";
import { INewsListProps, INewsList, IResponceResult } from './types'
import useFetch from '@/hooks/useFetch';
import { newsUrl } from '@/Utils/urls'
import { SS } from '@/Utils'
import { Spin } from '@arco-design/web-react';
import './index.scss'


const NewsList: React.FC<INewsListProps> = (props) => {

  const { flash } = props;
  const [reload, setReload] = useState(false);
  const { run: getNewsDigest, data: newsDigest, loading: newsLoad } = useFetch({
    url: newsUrl.getNewsDigest,
    type: 'get'
  })

  useEffect(() => {
    const typeId = SS.getItem('newsTypeId');
    const current = SS.getItem('newsCurrent');
    getNewsDigest({ type: typeId, current });
  }, [flash])

  useEffect(() => {
    if (newsDigest) {
      const { data: { records: data } } = newsDigest as IResponceResult;
      const current = SS.getItem('newsCurrent');
      if (current > 1) {
        const oldData = SS.getItem('newsDigest') || [];
        SS.setItem('newsDigest', [...oldData, ...data]);
      } else {
        SS.setItem('newsDigest', data);
      }
      setReload(!reload);
    }
  }, [newsDigest])

  /**
   * 缓存新闻列表
   */
  const newsList = useMemo(() => {
    return SS.getItem('newsDigest') as INewsList[] || [];
  }, [reload]);

  /**
   * 获取更多的新闻
   */
  const getMoreNews = () => {
    const type = SS.getItem('newsTypeId');
    const current = Number(SS.getItem('newsCurrent')) + 1;
    SS.setItem('newsCurrent', current);
    getNewsDigest({ type, current })
  }

  return (
    <div className="newslist-container">
      <div className="spin-container">
        {newsLoad && <Spin dot />}
      </div>
      {newsList?.map((news: INewsList) => (
        <NewsCard
          key={news._id}
          id={news._id}
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

export default memo(NewsList);