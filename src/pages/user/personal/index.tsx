import React, { useState } from "react";
import useFetch from "@/hooks/useFetch";
import {
  Avatar,
  Message,
  Upload,
  Input,
  Divider,
  Modal,
} from "@arco-design/web-react";
import { IconEdit } from "@arco-design/web-react/icon";
import localStorageUtils from "@/Utils/localStorageUtils";
import { updateAvatarConfig, updateNameConfig } from "./actionCreator";
import { useReduxData, useReduxDispatch } from "@/redux";
import Cropper from './Cropper'
import "./index.scss";
import ForgetForm from './ForgetForm'
const PersonalPage: React.FC = () => {
  // 修改头像
  // 修改昵称
  const userData = useReduxData(["userData", "data"]);
  const avatarUrl = userData.avatar;
  const userName = userData.name;
  const dispatch = useReduxDispatch();
  const data = localStorageUtils.get();
  const [Editing, setEditing] = useState(false);

  const { run: updateAvatar } = useFetch(updateAvatarConfig);
  const { run: updateName } = useFetch(updateNameConfig);
  return (
    <div className="personal-page">
      <Upload
        showUploadList={false}
        beforeUpload={(file) => {
          return new Promise((resolve) => {
            const modal = Modal.confirm({
              title: '裁剪图片',
              style: { width: 500 },
              footer: null,
              content: (
                <Cropper
                  file={file}
                  onOk={(file: File) => {
                    resolve(file)
                    modal.close()
                  }}
                  onCancel={() => {
                    resolve(false);
                    Message.info('取消上传');
                    modal.close();
                  }}
                >
                </Cropper>
              )
            })
          })
        }}
        customRequest={({ file }) => {
          updateAvatar({ file }).then((res) => {
            dispatch({
              type: "userData/setData",
              payload: {
                avatar: res.data.avatar,
              },
            });
            data.user.avatar = res.data.avatar;
            localStorageUtils.set(data);
            Message.info("修改成功");
          });
        }}
      >
        <Avatar
          size={150}
          shape="square"
          triggerIcon={<IconEdit style={{ width: 150, height: 50 }} />}
          triggerType="mask"
        >
          <img title="修改头像" src={avatarUrl} alt="avatar" />
        </Avatar>
      </Upload>

      <div className="editName">
        <p>昵称：</p>
        {Editing ? (
          <div className="editWrapper">
            <Input.Search
              size="small"
              placeholder="请输入新的昵称"
              className="editInput"
              searchButton={<span>确定</span>}
              onSearch={(value) => {
                if (value) {
                  updateName({ name: value }).then((res) => {
                    dispatch({
                      type: "userData/setData",
                      payload: {
                        name: value,
                      },
                    });
                    data.user.name = value;
                    localStorageUtils.set(data);
                  });
                } else {
                  Message.info("不能修改昵称为空");
                }
                setEditing(!Editing);
              }}
            ></Input.Search>
          </div>
        ) : (
            <div className="normalWrapper" style={{ fontSize: 24 }}>
              {userName}
              <IconEdit
                style={{ marginLeft: "5px", cursor: "pointer" }}
                onClick={() => {
                  setEditing(!Editing);
                }}
              />
            </div>
          )}
      </div>

      <div className="personal-box">
        <Divider orientation="left">修改密码</Divider>
        <ForgetForm></ForgetForm>
      </div>
    </div>
  );
};
export default PersonalPage;
