import { useState, useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import {
  Comment,
  List,
  Input,
  Message,
  Pagination,
  Spin,
} from "@arco-design/web-react";
import { IconSend } from "@arco-design/web-react/icon";
import { addCommentConfig, deleteCommentConfig } from "./actionCreator";
import { IReplyCommentProps } from "./types";
import ReplyCard from "./ReplyCard";

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
  const { run: deleteComment } = useFetch(deleteCommentConfig);

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

  // 删除评论函数
  const toDeleteComment = (id: string) => {
    deleteComment({ id: id }).then((res) => {
      Message.success("删除成功");
      toRefresh(current);
    });
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
              maxLength={200}
              showWordLimit
            />
          </div>
        }
      />
      {state === "all" && (
        <Spin className="load-in-theme" tip="请等待" loading={loading}>
          {/* 评论页 */}
          <List bordered={false}>
            {data.records?.map((item, index) => {
              return (
                <List.Item
                  className="reply-list"
                  key={item._id + "-reply-" + index}
                >
                  <ReplyCard
                    avatarUrl={avatarUrl}
                    data={item}
                    toDeleteComment={toDeleteComment}
                  />
                </List.Item>
              );
            })}
          </List>

          {/* 分页器 */}
          {data.total > 5 && (
            <Pagination
              key="reply"
              defaultCurrent={current}
              total={data.total}
              defaultPageSize={5}
              onChange={(current) => setCurrent(current)}
            />
          )}
        </Spin>
      )}
    </div>
  );
};

export default ReplyComment;
