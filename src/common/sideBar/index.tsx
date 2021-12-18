/*
 ** 侧边栏SideBar入口文件
 */
import { FC, ReactElement, ReactText, Fragment } from "react";
import { Menu, Affix } from "@arco-design/web-react";
import { withRouter, RouteComponentProps } from "react-router";
import { menuConfig } from "./menuConfig";
import { history } from "@/route";
import "./index.scss";

const { Item } = Menu;

const SideBar: FC<RouteComponentProps> = (props) => {
  const pathname = props.match.path;
  const handleClick = (key: ReactText) => {
    history.push({ pathname: pathname + key }); // 路由变化,push到对应的页面组件
  };
  let pathName = props.location.pathname;

  // 渲染Menu（即SideBar）
  function loggingIdentity(
    arg: RouteComponentProps
  ): ReactElement | ReactElement[] {
    return menuConfig.map((item) => {
      return (
        <Item key={item.key}>
          <item.icon />
          {item.title}
        </Item>
      );
    });
  }

  return (
    <Fragment>
      {/* 侧边栏 */}
      <Affix offsetTop={0} style={{ height: "calc(100vh - 64px)" }}>
        <Menu
          mode="vertical"
          style={{ height: "calc(100vh - 64px)" }}
          className="side-bar"
          onClickMenuItem={(key) => handleClick(key)}
          selectedKeys={["/" + pathName.split("/")[2]]}
        >
          {/* 子路由 */}
          {loggingIdentity(props)}
        </Menu>
      </Affix>
    </Fragment>
  );
};
export default withRouter(SideBar);
