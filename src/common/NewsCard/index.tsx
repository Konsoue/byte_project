import { Card, Image } from "@arco-design/web-react";
import { INewCardProps } from "./types";
import { useHistory } from "react-router-dom";
import { SS } from '@/Utils'
import "./index.scss";

const NewsCard: React.FC<INewCardProps> = ({
  title = "昨日XX县某某村造啥啥啥被啥啥啥了",
  content = "这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西",
  img = "https://i.loli.net/2021/11/14/p9tv7PWslCcwqi2.png",
  source = "央视新闻",
  time = "2021-02-05",
  id = "123",
}) => {
  const history = useHistory();

  const toDetailPage = (id: string | number) => {
    history.push(`/detail/${id}`)
    SS.setItem('newsTypeId', '');
  }

  return (
    <Card className="card-item">
      <div className="card-left">
        <div className="img-container">
          <Image src={img} />
        </div>
      </div>
      <div className="card-right">
        <header
          className="title"
          onClick={() => toDetailPage(id)}
        >
          {title}
        </header>
        <article className="content" onClick={() => toDetailPage(id)}>{content}</article>
        <footer className="footer">
          <div className="time">{time.split(" ")[0]}</div>
          <div className="source">{source}</div>
          <div className="star"></div>
        </footer>
      </div>
    </Card >
  );
};

export default NewsCard;
