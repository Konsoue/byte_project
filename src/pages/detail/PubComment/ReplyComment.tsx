import { useState, useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import {
  Comment,
  List,
  Button,
  Input,
  Message,
  Pagination,
  Spin,
} from "@arco-design/web-react";
import { IconHeart, IconDelete, IconSend } from "@arco-design/web-react/icon";
import { addCommentConfig } from "./actionCreator";
import { IReplyCommentProps } from "./types";
import "./index.scss";
const ReplyComment: React.FC<IReplyCommentProps> = ({
  avatarUrl,
  commentId,
  data,
  toRefresh,
  state,
}) => {
  // 输入的评论信息
  const [reply, setComment] = useState("");
  // 请求页码和size,类型
  const [current, setCurrent] = useState(1);
  // loading状态
  const [loading, setLoading] = useState(false);
  // 评论请求
  const { run: addComment } = useFetch(addCommentConfig);

  // 分页更换时调用
  useEffect(() => {
    setLoading(true);
    toRefresh(current);
  }, [current]);

  // 数据变更结束loading
  useEffect(() => {
    setLoading(false);
  }, [data]);

  // 评论函数
  const toReply = () => {
    if (reply === "") {
      Message.error("评论不能为空");
    } else {
      addComment({ id: commentId, content: reply, type: 2 }).then(() => {
        Message.success("评论成功");
        setComment("");
        toRefresh(current);
      });
    }
  };

  return (
    <div className="reply-box">
      {/* 回复框 */}
      <Comment
        align="right"
        avatar={avatarUrl}
        content={
          <div>
            <Input.Search
              value={reply}
              onChange={(value) => {
                setComment(value);
              }}
              placeholder="写下你的留言"
              searchButton={
                <>
                  <IconSend /> 回复
                </>
              }
              size="large"
              onSearch={toReply}
            />
          </div>
        }
      />
      {state === "all" && (
        <Spin tip="请等待" loading={loading}>
          {/* 评论页 */}
          <List bordered={false}>
            {data.records?.map((item, index) => {
              return (
                <List.Item className="reply-list" key={item._id + "-" + index}>
                  <Comment
                    author={item.userName}
                    avatar={item.userAvatar}
                    content={item.content}
                    datetime={item.time}
                    actions={[
                      <Button
                        className="custom-reply-action"
                        key="heart"
                        type="text"
                        size="mini"
                      >
                        <IconHeart />
                        {item.likesNum}
                      </Button>,
                      item.isMine && (
                        <Button
                          className="custom-reply-action"
                          type="text"
                          size="mini"
                          key="delete"
                        >
                          <IconDelete />
                          删除
                        </Button>
                      ),
                    ]}
                  ></Comment>
                </List.Item>
              );
            })}
          </List>

          {data.total > 10 && (
            <Pagination
              key="reply"
              defaultCurrent={current}
              total={data.total}
              defaultPageSize={10}
              onChange={(current) => setCurrent(current)}
            />
          )}
        </Spin>
      )}
    </div>
  );
};

export default ReplyComment;
