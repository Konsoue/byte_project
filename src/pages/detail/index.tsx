import { useState, useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import { Result, Button, Message } from "@arco-design/web-react";
import { IconFaceSmileFill } from "@arco-design/web-react/icon";
import localStorageUtils from "@/Utils/localStorageUtils";
import { history } from "@/route";
import Header from "@/common/Header";
import PubComment from "./PubComment/index";
import { IDetailProps } from "./types";
import {
  getNewsItemConfig,
  visitorGetNewsItemConfig,
  commentUrlConfig,
  addCollectionConfig,
  deleteCollectionConfig,
} from "./actionCreator";
import "./index.scss";

function Detail() {
  // 获取新闻id
  const detailId = history.location.pathname.split("/")[2];
  const userData = localStorageUtils.get();
  // 判断是否登陆状态
  const isLogin = JSON.stringify(userData) === "{}";

  // 存储新闻主题
  const [detail, setDetail] = useState<IDetailProps>({
    title: "",
    source: "",
    content: "",
    publishTime: "",
  });
  // 评论详情
  const [comment, setComment] = useState({
    records: [],
    total: 0,
  });
  // 收藏
  const [collection, setCollection] = useState(false);

  // 获取新闻主体请求
  const { run: getNews } = useFetch(
    isLogin ? visitorGetNewsItemConfig : getNewsItemConfig
  );
  // 获取新闻评论请求
  const { run: getComment } = useFetch(commentUrlConfig);
  // 收藏
  const { run: addCollection } = useFetch(addCollectionConfig);
  const { run: deleteCollection } = useFetch(deleteCollectionConfig);

  // 开始请求
  useEffect(() => {
    if (detailId) {
      getNews({ id: detailId })
        .then((res) => {
          setDetail(res.data);
          // 记录收藏信息
          !res.data.collection && setCollection(res.data.isCollection);
          if (!isLogin) {
            // 主体请求成功再去请求评论
            toRefresh();
          }
        })
        .catch((res) => {
          history.push({ pathname: "/detail" }); // 路由变化,push到对应的页面组件
        });
    }
  }, []);

  // 返回提示内容，用于请求出错或者没有id
  const returnWaitContent = (str: string, strBtn: string, fun: Function) => {
    return (
      <Result
        className="detail-content"
        style={{
          paddingTop: "10vh",
        }}
        status={null}
        icon={
          <IconFaceSmileFill spin style={{ color: "rgb(var(--arcoblue-6))" }} />
        }
        title={str}
        extra={
          <Button type="primary" onClick={() => fun()}>
            {strBtn}
          </Button>
        }
      ></Result>
    );
  };

  // 刷新评论函数
  const toRefresh = (
    size: number = 10,
    current: number = 1,
    orderBy: number = 2
  ) => {
    getComment({
      size: size,
      current: current,
      orderBy: orderBy,
      type: 1,
      id: detailId,
    })
      .then((res) => {
        setComment({
          records: res.data.records,
          total: res.data.total,
        });
      })
      .catch(() => {
        setComment({
          records: [],
          total: 0,
        });
      });
  };

  // 收藏
  const collectionRefresh = () => {
    if (!collection) {
      addCollection({ newsId: detailId }).then(() => {
        setCollection(!collection);
        Message.success("收藏成功");
      });
    } else {
      deleteCollection({ newsId: detailId }).then(() => {
        setCollection(!collection);
        Message.success("取消收藏成功");
      });
    }
  };

  return (
    <div className="detail-box">
      <Header />
      <article className="article-container">
        {/* 有id则显示请求内容 */}
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
            {/* 没有内容则显示提示 */}
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
            {/* 页脚 */}
            <footer>
              <span
                dangerouslySetInnerHTML={{ __html: detail.publishTime }}
              ></span>
              <span dangerouslySetInnerHTML={{ __html: detail.source }}></span>
            </footer>

            {isLogin ? (
              <div className="comment-null">
                <p>只有登陆后才可以获取评论或评论</p>
                <Button
                  type="primary"
                  onClick={() => {
                    history.push("/login");
                  }}
                >
                  登录
                </Button>
              </div>
            ) : (
              <PubComment
                detailId={detailId}
                avatarUrl={userData.user.avatar}
                data={comment}
                toRefresh={toRefresh}
                collection={collection}
                collectionRefresh={collectionRefresh}
              />
            )}
          </div>
        )}
      </article>
    </div>
  );
}

export default Detail;
