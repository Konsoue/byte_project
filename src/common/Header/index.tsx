import React, { memo, useMemo, useLayoutEffect } from "react";
import PubSearch from "@/common/PubSearch";
import PubAvatar from "./PubAvatar";
import NewTabs from "./NewTabs";
import { IHeaderProps, IPubAvatarProps } from "./types";
import localStorageUtils from "@/Utils/localStorageUtils";
import { useHistory, useLocation } from 'react-router-dom'
import "./index.scss";

const Header: React.FC<IHeaderProps> = (props) => {
  const { toFlash, flash } = props;
  const history = useHistory();
  const location = useLocation();
  const loginData: IPubAvatarProps = useMemo(() => {
    const data = localStorageUtils.get();
    if (JSON.stringify(data) === "{}") {
      return { login: false };
    } else {
      return { login: true, avatarUrl: data.user.avatar };
    }
  }, [flash]);

  // 用户设置的路由拦截
  useLayoutEffect(() => {
    const { pathname } = location;
    if (pathname.includes('/user')) {
      if (!loginData.login) history.push('/login');
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
          <NewTabs toFlash={toFlash} />
        </div>
        <div className="header-middle">
          <PubSearch />
        </div>
        <div className="header-right">
          <PubAvatar
            {...props}
            login={!!loginData?.login}
            avatarUrl={loginData?.avatarUrl}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(Header);
