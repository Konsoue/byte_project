import { Card, Image } from "@arco-design/web-react";
import { IComCardProps } from "./types";
import { useHistory } from "react-router-dom";
import LoadImg from '@/static/images/load.gif'
import "./index.scss";

const CommentCard: React.FC<IComCardProps> = ({
  newsTitle = '123',
  content = '123',
  newsId = '123',
  id = '123',
  time = "2021-02-05",
  userAvatar = LoadImg,
  username = '123',
}) => {
  const history = useHistory();

  const toDetailPage = (id: string | number) => {
    history.push(`/detail/${id}`)
  }

  return (
    <Card className="card-item">
      <div className="img-box">
        {userAvatar !== null ? <Image src={userAvatar} /> : null}
      </div>
      <div className="comment-content">

        <div className="comment-middle">
          <div className="user">
            {userAvatar !== null ? <span>对用户{username}的评论:</span> : <span>对新闻《{newsTitle}》的评论:</span>}
          </div>

          <div className="time">
            <span>{time.split(" ")[0]}</span>
          </div>
        </div>

        <div
          className="content"
          onClick={() => toDetailPage(newsId)}
        >
          {content}
        </div>
      </div>

    </Card >
  );
};

export default CommentCard;