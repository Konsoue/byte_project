import { newsUrl, commentUrl, collectionUrl } from "@/Utils/urls";
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

// 收藏
export const addCollectionConfig: IfetchParams = {
  url: collectionUrl.add,
  type: "post",
};

// 取消收藏
export const deleteCollectionConfig: IfetchParams = {
  url: collectionUrl.delete,
  type: "post",
};
