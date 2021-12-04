/*
 ** 侧边栏SideBar入口文件
 */
import React, { FC, ReactElement, ReactText, useState, Fragment } from "react";
import { Menu, Affix } from "@arco-design/web-react";
import { withRouter, RouteComponentProps } from "react-router";
import { menuConfig } from "./menuConfig";
import { history } from "@/route";
import "./index.less";

const { Item } = Menu;
const linkTo = {
  topRoute: "",
  to(route: string) {
    return this.topRoute + route;
  },
};
const SideBar: FC<RouteComponentProps> = (props) => {
  const [selecteds, setSelecteds] = useState([]);
  let [siderHeight, setSiderHeight] = useState<string>("calc(100vh - 100px)"); // 侧边栏高度

  const pathname = props.match.path;
  const handleClick = (key: ReactText) => {
    history.push({ pathname: pathname + key }); // 路由变化,push到对应的页面组件
  };
  let pathName = props.location.pathname;
  let index = pathName.lastIndexOf("/");
  let str = ["/" + pathName.substring(index + 1, pathName.length)];
  const Select = (selectedKeys: ReactText[] | undefined) => {
    let arr: string[] = [];
    selectedKeys &&
      (selectedKeys as string[]).forEach((item) => {
        let index = item.lastIndexOf("/");
        let str = item.substring(index + 1, item.length);
        arr.push(str);
      });
    setSelecteds(selectedKeys as []);
  };

  // 渲染Menu（即SideBar）
  function loggingIdentity(
    arg: RouteComponentProps
  ): ReactElement | ReactElement[] {
    const pathname = arg.location.pathname;
    let str: string;
    str = "/" + pathname.split("/").slice(1, 3).join("/");
    switch (str) {
      case linkTo.topRoute + "/user":
        console.log(menuConfig);
        return menuConfig.map((item) => {
          console.log(item);
          return (
            <Item key={item.key}>
              <item.icon />
              {item.title}
            </Item>
          );
        });
      default:
        return <Fragment></Fragment>;
    }
  }

  // 监听 Affix 固定状态改变
  const handleAffixChange = (affixed: boolean | undefined) => {
    if (affixed) {
      setSiderHeight("100vh");
    } else {
      setSiderHeight("calc(100vh - 100px)");
    }
  };

  return (
    <Fragment>
      {/* 侧边栏 */}
      <Affix offsetTop={0} onChange={handleAffixChange}>
        <Menu
          mode="vertical"
          style={{ height: siderHeight }}
          className="side-bar"
          onClickMenuItem={(key) => handleClick(key)}
          // onSelect={(e) => Select(e.selectedKeys)}
          // 解决了刷新之后无法保存高亮状态的bug，从路由拿
          selectedKeys={pathName.split("/").length > 3 ? str : selecteds}
        >
          {loggingIdentity(props)}
        </Menu>
      </Affix>
    </Fragment>
  );
};
export default withRouter(SideBar);
