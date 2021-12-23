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
      <div className="title">
        <div className="img-box">
          <Image src={userAvatar} />
        </div>
        <div className="user">
          <span>用户：</span>{userName}
        </div>
      </div>
      <div
        className="content"
      >
        <span className="span-font">评论内容： </span>
        {content}
      </div>
      <div className="footer">
        <div className="time">{time.split(" ")[0]}</div>
        <div
          className="detail"
          onClick={() => toDetailPage(newsId)}
        >查看详情</div>
      </div>
    </Card >
  );
};

export default LikeCard;