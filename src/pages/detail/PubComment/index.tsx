import { useState, useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import {
  Comment,
  List,
  Button,
  Input,
  Message,
  Pagination,
  Radio,
  Spin,
} from "@arco-design/web-react";
import { IconStarFill, IconSend, IconStar } from "@arco-design/web-react/icon";
import { addCommentConfig } from "./actionCreator";
import { IPubCommentProps } from "./types";
import CommentCard from "./CommentCard";
import "./index.scss";
const RadioGroup = Radio.Group;
const PubComment: React.FC<IPubCommentProps> = ({
  avatarUrl,
  detailId,
  data,
  toRefresh,
  collectionRefresh,
  collection,
}) => {
  // 输入的评论信息
  const [comment, setComment] = useState("");
  // 请求页码和size,类型
  const [current, setCurrent] = useState(1);
  const [size, setSize] = useState(10);
  const [orderBy, setOrderBy] = useState(2);
  // loading状态
  const [loading, setLoading] = useState(false);
  // 评论请求
  const { run: addComment } = useFetch(addCommentConfig);

  // 分页更换时调用
  useEffect(() => {
    if (data.records.length !== 0) {
      setLoading(true);
      toRefresh(size, current, orderBy);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size, current, orderBy]);

  // 数据变更结束loading
  useEffect(() => {
    setLoading(false);
  }, [data]);

  // 评论函数
  const toComment = () => {
    if (comment === "") {
      Message.error("评论不能为空");
    } else {
      addComment({ id: detailId, content: comment, type: 1 }).then(() => {
        Message.success("评论成功");
        setComment("");
        toRefresh(size, current, orderBy);
      });
    }
  };

  // 分页器变化函数
  const sizeChange = (toCurrent: number, toSize: number) => {
    size !== toSize && setSize(toSize);
    current !== toCurrent && setCurrent(toCurrent);
  };

  return (
    <div className="comment-box">
      {/* 回复框 */}
      <Comment
        align="right"
        actions={[
          <Button key="1" type="text" onClick={collectionRefresh}>
            {collection ? <IconStarFill /> : <IconStar />}
            {collection ? "已收藏" : "收藏"}
          </Button>,
          <Button key="2" type="primary" onClick={toComment}>
            <IconSend />
            回复
          </Button>,
        ]}
        avatar={avatarUrl}
        content={
          <div>
            <Input.TextArea
              value={comment}
              onChange={(value) => {
                setComment(value);
              }}
              rows={5}
              placeholder="写下你的留言"
            />
          </div>
        }
      />

      <Spin tip="请等待" loading={loading}>
        {/* 评论页 */}
        <List
          bordered={false}
          header={
            <span>
              {data.total}条评论
              <RadioGroup
                type="button"
                name="Radio"
                defaultValue={2}
                style={{ marginLeft: 20 }}
                onChange={(toOrderBy) => {
                  setOrderBy(toOrderBy);
                }}
              >
                <Radio value={2}>按热度排序</Radio>
                <Radio value={1}>按时间排序</Radio>
              </RadioGroup>
            </span>
          }
        >
          {/* 遍历返回卡片 */}
          {data.records?.map((item, index) => {
            return (
              <List.Item className="comment-list" key={item._id + "-" + index}>
                <CommentCard avatarUrl={avatarUrl} data={item} />
              </List.Item>
            );
          })}
        </List>

        {/* 分页其 */}
        {data.total > 10 && (
          <Pagination
            key="comment"
            defaultCurrent={current}
            total={data.total}
            defaultPageSize={size}
            sizeCanChange
            onChange={sizeChange}
          />
        )}
      </Spin>
    </div>
  );
};

export default PubComment;
