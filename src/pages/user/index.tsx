/*
 * @Author: your name
 * @Date: 2021-12-06 21:39:41
 * @LastEditTime: 2021-12-08 22:56:49
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \byte_project\src\pages\user\index.tsx
 */
import React, { useReducer, useMemo, createContext } from "react";
import SideBar from "@/common/sideBar/index";
import { Layout, Card, Result, Button } from "@arco-design/web-react";
import { Switch, Route } from "react-router-dom";
import { routeMethod } from "@/route/getRoute";
import { withRouter, RouteComponentProps } from "react-router";
import { IconFaceSmileFill } from "@arco-design/web-react/icon";
import { IUserAction, IUserState } from "./types";
import { history } from "@/route";
import TopHeader from "@/common/Header";
import "./index.scss";
import { LS } from "@/Utils";
import "@/theme.scss";
import "./index.scss";
export const UserContext = createContext((a: any) => a);

const { Sider, Content, Header } = Layout;

const initialState = {
  flash: false,
};

const userReducer = (state: IUserState, action: IUserAction) => {
  switch (action.type) {
    case "flash":
      return {
        ...state,
        flash: !state.flash,
      };
    default:
      return state;
  }
};

const User: React.FC<RouteComponentProps> = (props) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const theme = useMemo(() => {
    return LS.getItem("useDark");
  }, [state.flash]);

  const fontSize = useMemo(() => {
    return LS.getItem("fontSize");
  }, [state.flash]);

  const themeColor = useMemo(() => {
    return LS.getItem("themeColor");
  }, [state.flash]);

  const renderContent = () => {
    return (
      <Switch>
        {/* 其他渲染页 */}
        {routeMethod.requirePage("/user").map((item) => {
          return (
            <Route path={item.url} key={item.url} component={item.component} />
          );
        })}

        {/* 404页 */}
        <Route
          path={"/"}
          key={"/"}
          component={() => {
            return (
              <Result
                style={{
                  marginTop: "10vh",
                }}
                status={null}
                icon={
                  <IconFaceSmileFill
                    style={{ color: "rgb(var(--arcoblue-6))" }}
                  />
                }
                title="这里没有页面，点击按钮到页面去吧"
                extra={
                  <Button
                    type="primary"
                    onClick={() => {
                      history.push({ pathname: "/user/personal" });
                    }}
                  >
                    返回至个人中心
                  </Button>
                }
              ></Result>
            );
          }}
        />
      </Switch>
    );
  };

  return (
    <UserContext.Provider value={dispatch}>
      <div className={`userPage ${theme} ${fontSize} ${themeColor}`}>
        <Layout className="user-box">
          <Header>
            <TopHeader />
          </Header>
          <Layout>
            {/* 侧边栏 */}
            <Sider className="home-page-sider-bar" collapsed={false}>
              <SideBar />
            </Sider>
            <Content>
              <Card className="card-box">
                <Card className="content-box">{renderContent()}</Card>
              </Card>
            </Content>
          </Layout>
        </Layout>
      </div>
    </UserContext.Provider>
  );
};

export default withRouter(User);
