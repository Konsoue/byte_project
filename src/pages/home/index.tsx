import React from "react";
import NewsCard from "../../common/newsCard/newsCard";
import useFetch from '@/hooks/useFetch';
import { userUrl } from '@/Utils/urls'

function Home() {

  const userCreate = useFetch({
    url: userUrl.create,
    type: 'post'
  });


  return (
    <div style={{ width: "1000px" }}>
      <button onClick={() => {
        userCreate.run({
          name: 'csx',
          email: '8874@qq.com',
          password: '123'
        })
      }} >注册账号</button>
      <button onClick={() => { }}>登录</button>
      <NewsCard
        id={123}
        title={"昨日XX县某某村造啥啥啥被啥啥啥了"}
        content={
          "这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西"
        }
        img={"https://i.loli.net/2021/11/14/p9tv7PWslCcwqi2.png"}
        loading={false}
        star={false}
      />
      <NewsCard
        id={1223}
        title={
          "这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西这里有点东西"
        }
        content={"昨日XX县某某村造啥啥啥被啥啥啥了"}
        img={"https://i.loli.net/2021/11/30/sxe73E5WjSbZlz6.jpg"}
        loading={false}
        star={true}
      />
      <NewsCard loading={true} />
    </div>
  );
}

export default Home;
