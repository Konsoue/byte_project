import { useState, useEffect } from "react";
import Header from "@/common/Header";
import { getNewsItemConfig, visitorGetNewsItemConfig } from "./actionCreator";
import useFetch from "@/hooks/useFetch";
import localStorageUtils from "@/Utils/localStorageUtils";
import { history } from "@/route";
import { IDetailProps } from "./types";
import "./index.scss";
import { Result, Button } from "@arco-design/web-react";
import { IconFaceSmileFill } from "@arco-design/web-react/icon";

function Detail() {
  const detailId = history.location.pathname.split("/")[2];
  const [detail, setDetail] = useState<IDetailProps>({
    title: "",
    source: "",
    content: "",
    publishTime: "",
  });
  const { run: getNews } = useFetch(
    JSON.stringify(localStorageUtils.get()) === "{}"
      ? visitorGetNewsItemConfig
      : getNewsItemConfig
  );
  useEffect(() => {
    if (detailId) {
      getNews({ id: detailId })
        .then((res) => {
          setDetail(res.data);
        })
        .catch((res) => {
          history.push({ pathname: "/detail" }); // 路由变化,push到对应的页面组件
        });
    }
  }, []);

  const returnWaitContent = (str: string, strBtn: string, fun: Function) => {
    return (
      <Result
        className="detail-content"
        style={{
          paddingTop: "10vh",
        }}
        status={null}
        icon={<IconFaceSmileFill style={{ color: "rgb(var(--arcoblue-6))" }} />}
        title={str}
        extra={
          <Button type="primary" onClick={() => fun()}>
            {strBtn}
          </Button>
        }
      ></Result>
    );
  };
  return (
    <div className="detail-box">
      <Header />
      <article className="article-container">
        {!detailId ? (
          returnWaitContent(
            "这里没有新闻，点击按钮查看更多新闻吧",
            "返回至主页",
            () => {
              history.push({ pathname: "/" });
            }
          )
        ) : (
          <div className="detail-content">
            <h1
              className="title"
              dangerouslySetInnerHTML={{ __html: detail.title }}
            ></h1>
            {!detail.content ? (
              returnWaitContent(
                "网页还在路上，请耐心等待",
                "返回至主页",
                () => {
                  history.push({ pathname: "/" });
                }
              )
            ) : (
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: detail.content }}
              ></div>
            )}
            <footer>
              <span
                dangerouslySetInnerHTML={{ __html: detail.publishTime }}
              ></span>
              <span dangerouslySetInnerHTML={{ __html: detail.source }}></span>
            </footer>
          </div>
        )}
      </article>
    </div>
  );
}

export default Detail;
