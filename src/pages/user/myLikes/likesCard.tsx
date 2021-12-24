import { Card, Image } from "@arco-design/web-react";
import { ILikeCardProps } from "./types";
import { useHistory } from "react-router-dom";
import LoadImg from '@/static/images/load.gif'
import "./index.scss";

const LikeCard: React.FC<ILikeCardProps> = ({
  commentId = '123',
  content = '123',
  newsId = '123',
  id = '123',
  time = "2021-02-05",
  userAvatar = LoadImg,
  userName = '123',
}) => {
  const history = useHistory();

  const toDetailPage = (id: string | number) => {
    history.push(`/detail/${id}`)
  }

  return (
    <Card className="card-item">

      <div className="img-box">
        <Image src={userAvatar} />
      </div>

      <div className="user">
        <div className="title">
          <span >{userName}</span>
          <span className="user-title"> 赞了我的评论</span>
        </div>
        <div className="time">{time.split(" ")[0]}</div>
      </div>

      <div
        className="content"
        onClick={() => toDetailPage(newsId)}
      >
        {content}
      </div>

    </Card >
  );
};

export default LikeCard;