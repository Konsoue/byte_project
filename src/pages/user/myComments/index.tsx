import React, { useState, useEffect } from "react";
import useFetch from '@/hooks/useFetch';
import { commentUrl } from '@/Utils/urls'
import { IResponseResult, ICommentsList } from './types'
import CommentCard from "./commentsCard";

const MyComments: React.FC = () => {
  const { run: getMyComments, data: myComments } = useFetch({
    url: commentUrl.getMyComments,
    type: 'GET',
  })
  const [commentsArr, setArr] = useState([]);
  useEffect(() => {
    getMyComments({})
  }, [])

  useEffect(() => {
    if (myComments) {
      const { data } = myComments as IResponseResult;
      setArr(data.records);
      console.log(data)
    }
  }, [myComments])

  return (
    <article className="comment-container">
      {commentsArr.map((item: ICommentsList) => (
        <CommentCard
          key={'comment' + item._id}
          content={item.content}
          id={item._id}
          newsTitle={item.newsTitle}
          newsId={item.newsId}
          time={item.time}
          userAvatar={item.userAvatar}
        />
      ))}
    </article>
  )
};
export default MyComments;
