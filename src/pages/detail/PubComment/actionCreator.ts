import { commentUrl, likeUrl } from "@/Utils/urls";
import { IfetchParams } from "@/Utils/fetch/types";
// 评论
export const addCommentConfig: IfetchParams = {
  url: commentUrl.add,
  type: "post",
};

// 点赞
export const addLikeConfig: IfetchParams = {
  url: likeUrl.add,
  type: "post",
};

// 取消点赞
export const deleteLikeConfig: IfetchParams = {
  url: likeUrl.delete,
  type: "post",
};

// 查看回复
export const commentUrlConfig: IfetchParams = {
  url: commentUrl.getComments,
  type: "get",
};

// 删除评论
export const deleteCommentConfig: IfetchParams = {
  url: commentUrl.delete,
  type: "post",
};
