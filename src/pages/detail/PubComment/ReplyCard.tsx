import { useState } from "react";
import useFetch from "@/hooks/useFetch";
import { Message, Comment, Button } from "@arco-design/web-react";
import {
  IconHeart,
  IconDelete,
  IconHeartFill,
} from "@arco-design/web-react/icon";
import { addLikeConfig, deleteLikeConfig } from "./actionCreator";
import { ICommentCardProps } from "./types";

const ReplyCard: React.FC<ICommentCardProps> = ({ data, toDeleteComment }) => {
  const { content, likesNum, time, _id, userName, userAvatar, isMine, isLike } =
    data;
  const { run: addLike } = useFetch(addLikeConfig);
  const { run: deleteLike } = useFetch(deleteLikeConfig);
  const [like, setLike] = useState(isLike);

  // 点赞
  const likeRefresh = () => {
    if (!like) {
      addLike({ commentId: _id }).then(() => {
        setLike(!like);
        Message.success("点赞成功");
      });
    } else {
      deleteLike({ commentId: _id }).then(() => {
        setLike(!like);
        Message.success("取消点赞成功");
      });
    }
  };

  return (
    <Comment
      author={userName}
      avatar={userAvatar}
      content={content}
      datetime={time}
      /* 按钮组 */
      actions={[
        <Button
          className="custom-comment-action"
          key="heart"
          type="text"
          size="mini"
          onClick={likeRefresh}
        >
          {like ? <IconHeartFill /> : <IconHeart />}
          {likesNum + Number(!isLike ? Number(like) : -Number(!like))}
        </Button>,
        isMine && (
          <Button
            className="custom-comment-action"
            type="text"
            size="mini"
            key="delete"
            onClick={() => toDeleteComment(_id)}
          >
            <IconDelete />
            删除
          </Button>
        ),
      ]}
    />
  );
};

export default ReplyCard;
