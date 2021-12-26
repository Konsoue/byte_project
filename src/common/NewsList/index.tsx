import { useEffect, memo } from 'react'
import NewsCard from "@/common/NewsCard";
import { INewsListProps, INewsList, IResponceResult } from './types'
import useFetch from '@/hooks/useFetch';
import { newsUrl } from '@/Utils/urls'
import { LS } from '@/Utils'
import { Spin, Result, Button, Message } from '@arco-design/web-react';
import { IconFaceSmileFill } from '@arco-design/web-react/icon';
import { useReduxData, useReduxDispatch } from '@/redux'
import './index.scss'

const NewsList: React.FC<INewsListProps> = (props) => {
  const { showCard, clearSearch } = props;
  const newsTabId = useReduxData(['newsTab', 'data', 'id']);
  const newsDigestData = useReduxData(['newsDigest', 'data', 'news']);
  const newsDigestCurrent = useReduxData(['newsDigest', 'data', 'current']);
  const newsKeyword = useReduxData(['newsTab', 'data', 'keyword']);
  const dispatch = useReduxDispatch();
  const { run: getNewsDigest, data: newsDigest, loading: newsLoad } = useFetch({
    url: newsUrl.getNewsDigest,
    type: 'get'
  })

  useEffect(() => {
    let typeId = newsTabId;
    if (!typeId) {
      const newsType = LS.getItem('newsType');
      if (!newsType) return;
      typeId = newsType[0]?.id;
    }
    if (typeId) getNewsDigest({ type: typeId, current: newsDigestCurrent || 1, keyword: newsKeyword || '' });
  }, [newsTabId, newsDigestCurrent, newsKeyword])


  useEffect(() => {
    if (newsDigest) {
      const { data: { records: data } } = newsDigest as IResponceResult;
      if (!data.length && newsDigestCurrent > 1) Message.info('没有更多了');
      let news = newsDigestCurrent > 1 ? [...newsDigestData, ...data] : data
      dispatch({
        type: 'newsDigest/setData',
        payload: { news }
      });
    }
  }, [newsDigest])

  /**
   * 获取更多的新闻
   */
  const getMoreNews = () => {
    const current = (newsDigestCurrent || 1) + 1;
    dispatch({ type: 'newsDigest/setData', payload: { current } })
  }

  return (
    <div className={`newslist-container`}>
      <div className="spin-container">
        {newsLoad && <Spin className="load-in-theme" dot />}
      </div>
      <div className={`${showCard && 'show-card'}`}>
        {newsDigestData?.map((news: INewsList) => (
          <NewsCard
            key={news._id}
            id={news._id}
            title={news.title}
            img={news.img}
            content={news.digest}
            time={news.publishTime}
            source={news.source}
            showCard={showCard}
          />
        ))}
        {
          !newsDigestData.length && (
            <Result
              status={null}
              icon={<IconFaceSmileFill className='icon-in-theme' />}
              title='暂无此类新闻'
              extra={<Button className="btn-in-theme" onClick={() => clearSearch?.()}>返回</Button>}
            >
            </Result>
          )
        }
      </div>
      {
        newsDigestData.length !== 0 &&
        <section className="more-contianer">
          <div className="more-news" onClick={getMoreNews}>
            <span className="more-icon">
              <svg className={`${newsLoad && 'animate__rotateIn'}`} width="48" height="48" viewBox="0 0 48 48" fill="none"><path d="M42 24c0 9.941-8.059 18-18 18S6 33.941 6 24 14.059 6 24 6" stroke="rgb(162,53,17)" strokeWidth="4" /></svg>
            </span>
            <span className="more-word">{newsLoad ? '正在加载' : '点击加载更多'}</span>
          </div>
        </section>
      }
    </div>
  )
}

export default memo(NewsList);