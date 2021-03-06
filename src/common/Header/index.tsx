import React, { memo, useLayoutEffect } from "react";
import PubSearch from "@/common/PubSearch";
import PubAvatar from "./PubAvatar";
import NewTabs from "./NewTabs";
import PubWeather from "./PubWeather";
import { IHeaderProps } from "./types";
import localStorageUtils from "@/Utils/localStorageUtils";
import { useHistory, useLocation } from 'react-router-dom'
import { useReduxData, useReduxDispatch } from '@/redux'
import "./index.scss";

const Header: React.FC<IHeaderProps> = (props) => {
  const { topRef, isSearch, clearSearch } = props;
  const history = useHistory();
  const location = useLocation();
  const userData = useReduxData(['userData', 'data']);
  const dispatch = useReduxDispatch();
  
  // 用户设置的路由拦截
  useLayoutEffect(() => {
    const { pathname } = location;
    const data = localStorageUtils.get();
    if (JSON.stringify(data) !== "{}") {
      dispatch({
        type: 'userData/setData',
        payload: {
          login: true,
          avatar: data.user.avatar,
          name: data.user.name,
        }
      })
    } else {
      if (pathname.includes('/user')) history.push('/');
    }
  }, [])

  return (
    <div className="pub-header-container">
      <div className="pub-header">
        <div className="header-left">
          <div className="logo">
            <div
              className="title-font"
              onClick={() => {
                history.push("/");
              }}
            ></div>
          </div>
          <NewTabs topRef={topRef} />
        </div>
        <div className="header-middle">
          <PubSearch isSearch={isSearch} clearSearch={clearSearch} />
        </div>
        <div className="header-right">
          <PubWeather />
          <PubAvatar
            login={userData.login}
            avatarUrl={userData.avatar}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(Header);
