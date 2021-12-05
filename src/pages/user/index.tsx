import React from "react";
import SideBar from "@/common/sideBar/index";
import { Layout, Card } from "@arco-design/web-react";
import { Switch, Route } from "react-router-dom";
import { routeMethod } from "@/route/getRoute";
import { withRouter, RouteComponentProps } from "react-router";
const { Sider, Content } = Layout;

const User: React.FC<RouteComponentProps> = (props) => {
  const renderContent = () => {
    return (
      <Switch>
        {routeMethod.requirePage("/user").map((item) => {
          return (
            <Route path={item.url} key={item.url} component={item.component} />
          );
        })}
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
