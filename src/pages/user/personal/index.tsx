/*
 * @Author: your name
 * @Date: 2021-12-06 21:39:41
 * @LastEditTime: 2021-12-10 22:33:22
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \byte_project\src\pages\user\personal\index.tsx
 */
import React, { useState } from "react";
import useFetch from '@/hooks/useFetch'
import { LS } from '@/Utils'
import { Avatar, Upload } from '@arco-design/web-react'
import { IconEdit } from '@arco-design/web-react/icon'
import localStorageUtils from '@/Utils/localStorageUtils'
import { updateAvatarConfig } from './actionCreator'
import '@/theme.scss'
import './index.scss'

const PersonalPage: React.FC = () => {
  // 修改头像
  // 修改昵称
  const theme = LS.getItem('useDark') || 'light'
  const fontSize = LS.getItem('fontSize') || 'small'
  const themeColor = LS.getItem('themeColor') || 'blue'

  const data = localStorageUtils.get()
  let avatarUrl = data.user.avatar
  const userName = data.user.name
  const [url, setUrl] = useState(avatarUrl)

  const { run: updateAvatar } = useFetch(updateAvatarConfig)
  return (
    <div className={`personal-page ${theme} ${fontSize} ${themeColor}`}>
      <Upload
        showUploadList={false}
        customRequest={({ file }) => {
          updateAvatar({ file }).then((res) => {
            setUrl(res.data.avatar)
            data.user.avatar =  res.data.avatar
            localStorageUtils.set(data)
          })
        }}
      >
       <Avatar
          size={150}
          shape="square"
          triggerIcon={<IconEdit style={{ width: 150, height: 50 }} />}
          triggerType='mask'
        >
          <img src={url} alt="avatar" />
      </Avatar>
      </Upload>
      <div className="editName">
        {userName}
        <IconEdit />
      </div>
    </div>
  );
};
export default PersonalPage;
