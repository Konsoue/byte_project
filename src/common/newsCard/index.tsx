// import { useState } from "react";
import { Card, Skeleton, Button, Image } from "@arco-design/web-react";
import {
  IconStarFill,
  IconDelete,
  IconMessage,
  IconStar,
} from "@arco-design/web-react/icon";
import { INewCardProps } from "./types";
import "./index.scss";
const { Meta } = Card;

const NewsCard: React.FC<INewCardProps> = ({
  title = "昨日XX县某某村造啥啥啥被啥啥啥了",
  content = "这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西",
  img = "https://i.loli.net/2021/11/14/p9tv7PWslCcwqi2.png",
  loading = false,
  star = false,
}) => {
  return (
    <Card
      className="newsCard-box"
      title={
        <Skeleton loading={loading} text={{ rows: 1, width: 72 }}>
          <Button type="text">{title}</Button>
        </Skeleton>
      }
    >
      <Skeleton loading={loading} text={{ rows: 2, width: ["100%", "80%"] }}>
        {img ? <Image src={img} /> : null}
        <p style={img ? { width: "70%" } : { width: "100%" }}>{content}</p>
      </Skeleton>

      <Meta
        avatar={
          <Skeleton loading={loading}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <Button
                size="large"
                type="text"
                icon={
                  star ? (
                    <IconStarFill style={{ color: "#ffcd00" }} />
                  ) : (
                    <IconStar />
                  )
                }
              >
                收藏
              </Button>
              <Button size="large" type="text" icon={<IconMessage />}>
                评论
              </Button>
              <Button size="large" type="text" icon={<IconDelete />}>
                不感兴趣
              </Button>
            </div>
          </Skeleton>
        }
      />
    </Card>
  );
};

export default NewsCard;
