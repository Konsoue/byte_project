import React, { useLayoutEffect } from "react";
import SideBar from "@/common/sideBar/index";
import { Layout, Card, Result, Button } from "@arco-design/web-react";
import { Switch, Route } from "react-router-dom";
import { routeMethod } from "@/route/getRoute";
import { withRouter, RouteComponentProps } from "react-router";
import { IconFaceSmileFill } from "@arco-design/web-react/icon";
import TopHeader from "@/common/Header";
import localStorageUtils from "@/Utils/localStorageUtils";
import { useReduxDispatch } from '@/redux'
import { useHistory, useLocation } from 'react-router-dom'
import "./index.scss";

const { Sider, Content, Header } = Layout;

const User: React.FC<RouteComponentProps> = (props) => {
  const reduxDispatch = useReduxDispatch();
  const location = useLocation();
  const history = useHistory();

  // 用户设置的路由拦截
  useLayoutEffect(() => {
    const { pathname } = location;
    const data = localStorageUtils.get();
    if (JSON.stringify(data) !== "{}") {
      reduxDispatch({
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
    <div className={`userPage`}>
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
  );
};

export default withRouter(User);
