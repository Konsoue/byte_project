import { userUrl } from "@/Utils/urls";
import { IfetchParams } from "@/Utils/fetch/types";
export const updateAvatarConfig: IfetchParams = {
  url: userUrl.updateAvatar,
  type: "post",
  headers: {
    "Content-Type": "multipart/form-data"
  }
};
