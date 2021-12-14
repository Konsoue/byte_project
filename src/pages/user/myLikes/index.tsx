import React, { useEffect, useState } from "react";
import useFetch from '@/hooks/useFetch';
import { likeUrl } from '@/Utils/urls'
import { IResponseResult, IlikesList } from './types'
import CommentCard from "../myComments/commentsCard";

const MyLikes: React.FC = () => {

  const { run: getMyLikes, data: myLikes } = useFetch({
    url: likeUrl.getMyLikes,
    type: 'GET',
  })
  const [likesArr, setArr] = useState([]);
  useEffect(() => {
    getMyLikes({})
  }, [])

  useEffect(() => {
    if (myLikes) {
      const { data } = myLikes as IResponseResult;
      setArr(data.records);
    }
  }, [myLikes])

  return (
    <article >
      {likesArr.map((item: IlikesList) => (
        <CommentCard
          key={'like' + item._id}
          content={item.content}
          id={item._id}
          time={item.time}
          commentId={item.commentId}
          newsId={item.newsId}
        />
      ))}
    </article>
  )
};
export default MyLikes;