import { userUrl } from "@/Utils/urls";
import { IfetchParams } from "@/Utils/fetch/types";
export const loginFetchConfig: IfetchParams = {
  url: userUrl.login,
  type: "post",
};
export const createFetchConfig: IfetchParams = {
  url: userUrl.create,
  type: "post",
};

export const sendCreateMailConfig: IfetchParams = {
  url: userUrl.sendCreateMail,
  type: "get",
};
