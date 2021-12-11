import React from "react";
import useFetch from '@/hooks/useFetch'
import { Avatar, Message, Upload } from '@arco-design/web-react'
import { IconEdit } from '@arco-design/web-react/icon'
import localStorageUtils from '@/Utils/localStorageUtils'
import { updateAvatarConfig } from './actionCreator'
import { useReduxData, useReduxDispatch } from '@/redux'
import '@/theme.scss'
import './index.scss'

const PersonalPage: React.FC = () => {
  // 修改头像
  // 修改昵称
  const userData = useReduxData(['userData', 'data']);
  const avatarUrl = userData.avatar
  const userName = userData.name
  const dispatch = useReduxDispatch();
  const data = localStorageUtils.get()

  const { run: updateAvatar } = useFetch(updateAvatarConfig)
  return (
    <div className='personal-page'>
      <Upload
        showUploadList={false}
        customRequest={({ file }) => {
          updateAvatar({ file }).then((res) => {
            dispatch({
              type: 'userData/setData',
              payload: {
                avatar: res.data.avatar,
              }
            })
            data.user.avatar = res.data.avatar
            localStorageUtils.set(data)
            Message.info('修改成功')
          })
        }}
      >
        <Avatar
          size={150}
          shape="square"
          triggerIcon={<IconEdit style={{ width: 150, height: 50 }} />}
          triggerType='mask'
        >
          <img src={avatarUrl} alt="avatar" />
        </Avatar>
      </Upload>
      <div className="editName" style={{ fontSize: 18, cursor: 'pointer' }}>
        昵称：{userName}
        <IconEdit />
      </div>
    </div>
  );
};
export default PersonalPage;
