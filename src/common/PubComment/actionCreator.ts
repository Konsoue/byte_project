import { commentUrl } from "@/Utils/urls";
import { IfetchParams } from "@/Utils/fetch/types";
export const addCommentConfig: IfetchParams = {
  url: commentUrl.add,
  type: "post",
};

export const addDeleteConfig: IfetchParams = {
  url: commentUrl.delete,
  type: "post",
};
