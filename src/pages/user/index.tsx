import React from "react";
import SideBar from "@/common/sideBar/index";
import { Layout, Card, Result, Button } from "@arco-design/web-react";
import { Switch, Route } from "react-router-dom";
import { routeMethod } from "@/route/getRoute";
import { withRouter, RouteComponentProps } from "react-router";
import { IconFaceSmileFill } from "@arco-design/web-react/icon";
import { history } from "@/route";

const { Sider, Content } = Layout;

const User: React.FC<RouteComponentProps> = (props) => {
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
                  marginTop: "20vh",
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
    <Layout>
      {/* 侧边栏 */}
      <Sider className="home-page-sider-bar" collapsed={false}>
        <SideBar />
      </Sider>
      <Content style={{ overflow: "hidden" }}>
        <Card
          style={{ height: "100%" }}
          bodyStyle={{
            backgroundColor: "#f0f2f5",
            padding: 0,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {renderContent()}
        </Card>
      </Content>
    </Layout>
  );
};

export default withRouter(User);
