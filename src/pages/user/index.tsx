import React from "react";
import SideBar from "@/common/sideBar/index";
import { Layout, Card } from "@arco-design/web-react";
import { Switch, Route } from "react-router-dom";
import personal from "./personal";
import mySettings from "./mySettings";
// import PlaceholderPage from '@/Components/PlaceholderPage';
import { withRouter, RouteComponentProps } from "react-router";
const linkTo = {
  topRoute: "/user",
  to(route: string) {
    return this.topRoute + route;
  },
};
const { Sider, Content } = Layout;

const User: React.FC<RouteComponentProps> = (props) => {
  const pathName = props.location.pathname.split("/");
  const renderContent = () => {
    return (
      <Switch>
        <Route
          path={linkTo.topRoute + "/personal"}
          key={linkTo.topRoute + "/personal"}
          component={personal}
        />
        <Route
          path={linkTo.topRoute + "/mySettings"}
          key={linkTo.topRoute + "/mySettings"}
          component={mySettings}
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
