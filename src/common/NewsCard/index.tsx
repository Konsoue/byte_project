import { Card, Image } from "@arco-design/web-react";
import { INewCardProps } from "./types";
import { useHistory } from "react-router-dom";
import { useReduxDispatch } from '@/redux';
import LoadImg from '@/static/images/load.gif'
import "./index.scss";

const NewsCard: React.FC<INewCardProps> = ({
  img = LoadImg,
  showCard = false,
  title,
  content,
  source,
  time,
  id,
}) => {
  const history = useHistory();
  const dispatch = useReduxDispatch();
  const toDetailPage = (id: string | number) => {
    dispatch({ type: 'newsTab/setData', payload: { id: false, keyword: '' } })
    history.push(`/detail/${id}`)
  }

  if (showCard && content.length > 100) {
    content = content.slice(0, 100) + '...';
  }

  return (
    <Card className={`${showCard && 'is-card'} card-item`}>
      <div className="card-left">
        <div className="img-container">
          <Image src={img} />
        </div>
      </div>
      <div className="card-right">
        <header
          className="title"
          onClick={() => toDetailPage(id!)}
        >
          {title}
        </header>
        {
          !showCard && <article className="content" onClick={() => toDetailPage(id!)}>
            {content}
          </article>
        }
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
