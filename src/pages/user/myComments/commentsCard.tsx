import { Card } from "@arco-design/web-react";
import { IComCardProps } from "./types";
import { useHistory } from "react-router-dom";
import "./index.scss";

const CommentCard: React.FC<IComCardProps> = ({
  commentId = '123',
  content = '123',
  newsId = '123',
  id = '123',
  time = "2021-02-05",

}) => {
  const history = useHistory();

  const toDetailPage = (id: string | number) => {
    history.push(`/detail/${id}`)
  }

  return (
    <Card className="card-item">
      <div
        className="title"

      >
        {content}
      </div>
      <div className="footer">
        <div className="time">{time.split(" ")[0]}</div>
        <div
          className="detail"
          onClick={() => toDetailPage(id)}
        >查看详情</div>
      </div>
    </Card >
  );
};

export default CommentCard;