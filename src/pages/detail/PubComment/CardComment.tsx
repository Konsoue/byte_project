import { useState } from "react";
import useFetch from "@/hooks/useFetch";
import { Message, Comment, Button } from "@arco-design/web-react";
import {
  IconHeart,
  IconMessage,
  IconDelete,
  IconSend,
  IconHeartFill,
} from "@arco-design/web-react/icon";
import {
  commentUrlConfig,
  addLikeConfig,
  deleteLikeConfig,
} from "./actionCreator";
import ReplyComment from "./ReplyComment";
import { ICommentCardProps } from "./types";

enum ReplyState {
  close = "close",
  reply = "reply",
  all = "all",
}

const CommentCard: React.FC<ICommentCardProps> = ({
  data,
  avatarUrl,
  toDeleteComment,
}) => {
  const {
    content,
    likesNum,
    time,
    _id,
    userName,
    userAvatar,
    isMine,
    isLike,
    followNum,
  } = data;
  const { run: getComment } = useFetch(commentUrlConfig);
  const { run: addLike } = useFetch(addLikeConfig);
  const { run: deleteLike } = useFetch(deleteLikeConfig);
  const [like, setLike] = useState(isLike);
  const [replyNum, setReplyNum] = useState(followNum);
  const [replyState, setReplyState] = useState(ReplyState.close);
  // 回复详情
  const [replyData, setReply] = useState({
    records: [],
    total: 0,
  });

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

  // 刷新评论函数
  const toRefresh = (current: number = 1) => {
    getComment({
      size: 5,
      current: current,
      orderBy: 2,
      type: 2,
      id: _id,
    })
      .then((res) => {
        setReply({
          records: res.data.records,
          total: res.data.total,
        });
        setReplyNum(res.data.total);
      })
      .catch(() => {
        setReply({
          records: [],
          total: 0,
        });
      });
  };

  return (
    <div className="comment-content">
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
          // <Button
          //   className="custom-comment-action"
          //   type="text"
          //   size="mini"
          //   key="reply"
          //   onClick={() => {
          //     if (replyState === ReplyState.close) {
          //       setReplyState(ReplyState.reply);
          //     } else if (replyState === ReplyState.reply) {
          //       setReplyState(ReplyState.close);
          //     }
          //   }}
          // >
          //   <IconSend />
          //   回复
          // </Button>,
          <Button
            className="custom-comment-action"
            type="text"
            size="mini"
            key="all"
            onClick={() => {
              if (replyState === ReplyState.all) {
                setReplyState(ReplyState.close);
              } else {
                setReplyState(ReplyState.all);
              }
            }}
          >
            <IconMessage />
            {replyState === ReplyState.all ? "收起回复" : "回复"}
            {replyNum === 0 ? null : replyNum}
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
      >
        {/* 回复框&回复 */}
        {replyState !== ReplyState.close && (
          <ReplyComment
            key={_id + "-reply"}
            commentId={_id}
            avatarUrl={avatarUrl}
            data={replyData}
            state={replyState}
            toRefresh={toRefresh}
          />
        )}
      </Comment>
    </div>
  );
};

export default CommentCard;
