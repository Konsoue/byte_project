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
} from "@arco-design/web-react";
import {
  IconHeart,
  IconMessage,
  IconHeartFill,
  IconStarFill,
  IconStar,
} from "@arco-design/web-react/icon";
import { addCommentConfig } from "./actionCreator";
import { IPubCommentProps } from "./types";
import "./index.scss";
const RadioGroup = Radio.Group;
const PubComment: React.FC<IPubCommentProps> = ({
  avatarUrl,
  detailId,
  data,
  toRefresh,
}) => {
  // 输入的评论信息
  const [comment, setComment] = useState("");
  // 请求页码和size,类型
  const [current, setCurrent] = useState(1);
  const [size, setSize] = useState(10);
  const [orderBy, setOrderBy] = useState(2);
  // 评论请求
  const { run: addComment } = useFetch(addCommentConfig);

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
    toRefresh(toSize, toCurrent, orderBy);
  };

  // 单选框变化函数
  const orderByChange = (toOrderBy: number) => {
    setOrderBy(toOrderBy);
    toRefresh(size, current, toOrderBy);
  };

  return (
    <div className="comment-box">
      {/* 回复框 */}
      <Comment
        align="right"
        actions={[
          <Button key="1" type="primary" onClick={toComment}>
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
              onChange={orderByChange}
            >
              <Radio value={2}>按热度排序</Radio>
              <Radio value={1}>按时间排序</Radio>
            </RadioGroup>
          </span>
        }
      >
        {data.records?.map((item, index) => {
          item.userName = "Socrates";
          item.usetAvatar =
            "//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp";
          item.isMine = true;
          return (
            <List.Item className="comment-list" key={item._id + "-" + index}>
              <Comment
                author={item.userName}
                avatar={item.usetAvatar}
                content={item.content}
                datetime={item.time}
                actions={[
                  <span
                    className="custom-comment-action"
                    key="heart"
                    /*  onClick={() =>
                    setLikes(
                      like
                        ? likes.filter((x) => x !== item.id)
                        : [...likes, item.id]
                    )
                  } */
                  >
                    <IconHeart />
                    {item.likesNum}
                  </span>,
                  <span
                    className="custom-comment-action"
                    key="star"
                    /* onClick={() =>
                    setStars(
                      star
                        ? stars.filter((x) => x !== item.id)
                        : [...stars, item.id]
                    )
                  } */
                  >
                    <IconStar />
                  </span>,
                  <span className="custom-comment-action" key="reply">
                    <IconMessage /> Reply
                  </span>,
                  <span className="custom-comment-action" key="all">
                    <IconMessage /> 查看回复
                  </span>,
                ]}
              ></Comment>
            </List.Item>
          );
        })}
      </List>

      <Pagination
        defaultCurrent={current}
        total={data.total}
        defaultPageSize={size}
        sizeCanChange
        onChange={sizeChange}
      />
    </div>
  );
};

export default PubComment;
