import { useState, useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import { Comment, Button } from "@arco-design/web-react";
import {
  IconHeart,
  IconMessage,
  IconDelete,
  IconSend,
} from "@arco-design/web-react/icon";
import { commentUrlConfig } from "./actionCreator";
import ReplyComment from "./ReplyComment";
import { ICommentCardProps } from "./types";
import "./index.scss";

enum ReplyState {
  close = "close",
  reply = "reply",
  all = "all",
}

// 获取新闻评论请求

const PubComment: React.FC<ICommentCardProps> = ({ data, avatarUrl }) => {
  const { content, likesNum, time, _id, userName, userAvatar, isMine } = data;
  const { run: getComment } = useFetch(commentUrlConfig);
  const [replyState, setReplyState] = useState(ReplyState.close);
  // 回复详情
  const [replyData, setReply] = useState({
    records: [],
    total: 0,
  });

  useEffect(() => {
    if (replyState === ReplyState.all) {
      toRefresh();
    }
  }, [replyState]);

  // 刷新评论函数
  const toRefresh = (current: number = 1) => {
    getComment({
      size: 10,
      current: current,
      orderBy: 1,
      type: 2,
      id: _id,
    })
      .then((res) => {
        setReply({
          records: res.data.records,
          total: res.data.total,
        });
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
          >
            <IconHeart />
            {likesNum}
          </Button>,
          <Button
            className="custom-comment-action"
            type="text"
            size="mini"
            key="reply"
            onClick={() => {
              setReplyState(ReplyState.reply);
            }}
          >
            <IconSend />
            回复
          </Button>,
          <Button
            className="custom-comment-action"
            type="text"
            size="mini"
            key="all"
            onClick={() => {
              if (replyState !== ReplyState.all) {
                setReplyState(ReplyState.all);
              } else {
                setReplyState(ReplyState.close);
              }
            }}
          >
            <IconMessage />
            {replyState === ReplyState.all ? "收起回复" : "查看回复"}
          </Button>,
          isMine && (
            <Button
              className="custom-comment-action"
              type="text"
              size="mini"
              key="delete"
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

export default PubComment;
