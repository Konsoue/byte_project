/*
 * @Author: your name
 * @Date: 2021-12-06 21:39:41
 * @LastEditTime: 2021-12-07 22:27:16
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \byte_project\src\pages\home\index.tsx
 */
import { createRef, useLayoutEffect, useState } from "react";
import Header from '@/common/Header';
import NewsList from '@/common/NewsList';
import { IHomeProps, IWeatherData } from "./types";
import { BackTop } from '@arco-design/web-react';
import { useReduxData } from "@/redux";
import './index.scss';
import dayjs from 'dayjs'

const createText = (weather: IWeatherData): any => {
  const date = dayjs(new Date()).format('YYYY年MM月DD日');
  let { type, high, low } = weather.forecast[0];
  high = high.slice(2).trim();
  low = low.slice(2).trim();
  let text = `${date} ${weather.city} ${type} ${high}/${low}`;
  return text;
}

const Home: React.FC<IHomeProps> = (props) => {
  const topRef = createRef();
  const [weatherText, setText] = useState('');
  const weatherData = useReduxData(['weather', 'data', 'data'])
  const [showCard, setShow] = useState(false);

  useLayoutEffect(() => {
    if (weatherData) {
      const text = createText(weatherData);
      setText(text);
    }
  }, [weatherData])

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
          <div className="weather">
            <pre>{weatherText}</pre>
          </div>
        </div>
        <NewsList showCard={showCard} />
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
