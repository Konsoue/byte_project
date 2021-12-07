import React, { useState, useEffect } from "react";
import useFetch from '@/hooks/useFetch';
import { collectionUrl } from '@/Utils/urls'
import NewsCard from "@/common/NewsCard";
import { IResponseResult, INewsList } from './types'


const MyCollection: React.FC = () => {

  const { run: getMyCollections, data: myCollections } = useFetch({
    url: collectionUrl.getMyCollections,
    type: 'GET',
  })
  const [collectionArr, setArr] = useState([]);
  useEffect(() => {
    getMyCollections({})
  }, [])

  useEffect(() => {
    console.log(myCollections)
    if (myCollections) {
      const { data } = myCollections as IResponseResult;
      //将收藏的新闻数组存入collectionArr
      setArr(data.records);
    }
  }, [myCollections])

  return (
    <article >
      {collectionArr.map((news: INewsList) => (
        <NewsCard
          key={news._id}
          title={news.title}
          img={news.img}
          content={news.digest}
        />
      ))}
    </article>
  )
};
export default MyCollection;
