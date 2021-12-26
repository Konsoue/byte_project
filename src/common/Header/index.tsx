import React, { memo } from "react";
import PubSearch from "@/common/PubSearch";
import PubAvatar from "./PubAvatar";
import NewTabs from "./NewTabs";
import PubWeather from "./PubWeather";
import { IHeaderProps } from "./types";
import { useHistory } from 'react-router-dom'
import { useReduxData } from '@/redux'
import "./index.scss";

const Header: React.FC<IHeaderProps> = (props) => {
  const { topRef, isSearch, clearSearch } = props;
  const history = useHistory();
  const userData = useReduxData(['userData', 'data']);

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
