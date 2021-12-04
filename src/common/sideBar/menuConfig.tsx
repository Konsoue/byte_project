import {
  IconStarFill,
  IconDelete,
  IconMessage,
  IconStar,
} from "@arco-design/web-react/icon";
import "./index.less";

// 多级SideBar
export const menuConfig = [
  {
    key: "/personal",
    icon: IconStarFill,
    title: "个人中心",
    path: "/personal",
    component: " ",
  },
  {
    key: "/mySettings",
    icon: IconStarFill,
    title: "应用设置",
    path: "/settings",
    component: " ",
  },
  {
    key: "/myReport",
    icon: IconStarFill,
    title: "使用报告",
    path: "/report",
    component: " ",
  },
  {
    key: "/myCollection",
    icon: IconStarFill,
    title: "我的收藏",
    path: "/myCollection",
    component: " ",
  },
  {
    key: "/myComments",
    icon: IconStarFill,
    title: "我的评论",
    path: "/myComments",
    component: " ",
  },
  {
    key: "/myLikes",
    icon: IconStarFill,
    title: "我的点赞",
    path: "/myLikes",
    component: " ",
  },
];
