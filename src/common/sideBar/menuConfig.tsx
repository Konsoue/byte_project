import {
  IconStar,
  IconEdit,
  IconBook,
  IconUser,
  IconMessage,
  IconHeart,
} from "@arco-design/web-react/icon";

// SideBar，这里仅设置user页二级路由
export const menuConfig = [
  {
    key: "/personal",
    icon: IconUser,
    title: "个人中心",
    path: "/personal",
    component: " ",
  },
  {
    key: "/mySettings",
    icon: IconEdit,
    title: "应用设置",
    path: "/settings",
    component: " ",
  },
  {
    key: "/myReport",
    icon: IconBook,
    title: "使用报告",
    path: "/report",
    component: " ",
  },
  {
    key: "/myCollection",
    icon: IconStar,
    title: "我的收藏",
    path: "/myCollection",
    component: " ",
  },
  {
    key: "/myComments",
    icon: IconMessage,
    title: "我的评论",
    path: "/myComments",
    component: " ",
  },
  {
    key: "/myLikes",
    icon: IconHeart,
    title: "我的点赞",
    path: "/myLikes",
    component: " ",
  },
];
