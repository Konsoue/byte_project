/*
 * @Author: your name
 * @Date: 2021-12-10 22:39:23
 * @LastEditTime: 2021-12-23 17:25:14
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \byte_project\src\pages\user\personal\actionCreator.ts
 */
import { userUrl } from "@/Utils/urls";
import { IfetchParams } from "@/Utils/fetch/types";
export const updateAvatarConfig: IfetchParams = {
  url: userUrl.updateAvatar,
  type: "post",
  headers: {
    "Content-Type": "multipart/form-data"
  }
};
export const updateNameConfig: IfetchParams = {
  url: userUrl.updateName,
  type: "post",
};
export const resetPasswordConfig: IfetchParams = {
  url: userUrl.updatePassword,
  type: "post",
};