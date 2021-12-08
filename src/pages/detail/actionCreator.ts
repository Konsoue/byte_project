import { newsUrl,commentUrl } from "@/Utils/urls";
import { IfetchParams } from "@/Utils/fetch/types";
export const getNewsItemConfig: IfetchParams = {
  url: newsUrl.getNewsItem,
  type: "get",
};

export const visitorGetNewsItemConfig: IfetchParams = {
  url: newsUrl.visitorGetNewsItem,
  type: "get",
};

export const commentUrlConfig: IfetchParams = {
  url: commentUrl.getComments,
  type: "get",
};