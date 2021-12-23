/*
 * @Author: your name
 * @Date: 2021-12-06 21:39:41
 * @LastEditTime: 2021-12-07 22:27:16
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \byte_project\src\pages\home\index.tsx
 */
import { createRef, useLayoutEffect, useState, useMemo } from "react";
import Header from '@/common/Header';
import NewsList from '@/common/NewsList';
import { IHomeProps, IWeatherData } from "./types";
import { BackTop, Button } from '@arco-design/web-react';
import { useReduxData } from "@/redux";
import { useLocation, useHistory } from 'react-router-dom'
import { useReduxDispatch } from "@/redux";
import './index.scss';
import dayjs from 'dayjs'

// 生成天气文字
const createText = (weather: IWeatherData): any => {
  const date = dayjs(new Date()).format('YYYY年MM月DD日');
  let { type, high, low } = weather.forecast[0];
  high = high.slice(2).trim();
  low = low.slice(2).trim();
  let text = `${date} ${weather.city} ${type} ${high}/${low}`;
  return text;
}

// 获取路由对应hash值
const getHashValue = (urlHash: string, key: string): string => {
  const matches = urlHash.match(new RegExp(key + '=([^&]*)'));
  return matches ? matches[1] : '';
}

const Home: React.FC<IHomeProps> = (props) => {
  const topRef = createRef();
  const [weatherText, setText] = useState('');
  const weatherData = useReduxData(['weather', 'data', 'data'])
  const [showCard, setShow] = useState(false);
  const location = useLocation();
  const dispatch = useReduxDispatch();
  const history = useHistory();

  useLayoutEffect(() => {
    if (weatherData) {
      const text = createText(weatherData);
      setText(text);
    }
  }, [weatherData])

  const isSearch = useMemo(() => {
    const { search } = location;
    const res = getHashValue(search, 'search');
    return res.length !== 0;
  }, [location])

  // 清空搜索链接，返回首页
  const clearSearch = () => {
    dispatch({
      type: 'newsTab/setData',
      payload: {
        keyword: '',
      }
    })
    dispatch({
      type: 'newsDigest/setData',
      payload: { current: false }
    })
    history.push('/');
  }

  return (
    <div id="home-container">
      <Header topRef={topRef} />
      <article id="home-article" className="article-container">
        <div className="list-top">
          <div className="control">
            <div className={`preview btn-left ${showCard || 'current'}`}>
              <div className="back-ground">
                <div className="before"></div>
                <div className="after"></div>
              </div>
              <div className="in-air" onClick={() => setShow(false)}>
                <i></i>
                <a>列表预览</a>
              </div>
            </div>
            <div className={`preview btn-right ${showCard && 'current'}`}>
              <div className="back-ground">
                <div className="before"></div>
                <div className="after"></div>
              </div>
              <div className="in-air" onClick={() => setShow(true)}>
                <i></i>
                <a>卡片预览</a>
              </div>
            </div>
          </div>
          {
            isSearch &&
            <div className="clear-search">
              <Button
                className="clear-btn"
                onClick={clearSearch}
              >
                返回
              </Button>
            </div>
          }
          <div className="weather">
            <pre>{weatherText}</pre>
          </div>
        </div>
        <NewsList showCard={showCard} isSearch={isSearch} />
      </article>
      <BackTop
        ref={topRef}
        visibleHeight={30}
        style={{ position: 'absolute' }}
        target={() => document.getElementById('home-article') || window}
      />
    </div>
  );
}

export default Home;
