/*
 * @Author: your name
 * @Date: 2021-12-07 22:51:34
 * @LastEditTime: 2021-12-23 17:41:09
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \byte_project\src\pages\user\personal\index.tsx
 */
import React, { useState } from "react";
import useFetch from '@/hooks/useFetch'
import { Avatar, Message, Upload, Input } from '@arco-design/web-react'
import { IconEdit } from '@arco-design/web-react/icon'
import localStorageUtils from '@/Utils/localStorageUtils'
import { updateAvatarConfig, updateNameConfig } from './actionCreator'
import { useReduxData, useReduxDispatch } from '@/redux'
import './index.scss'

const PersonalPage: React.FC = () => {
  // 修改头像
  // 修改昵称
  const userData = useReduxData(['userData', 'data']);
  const avatarUrl = userData.avatar
  const userName = userData.name
  const dispatch = useReduxDispatch();
  const data = localStorageUtils.get()
  const [Editing, setEditing] = useState(false)

  const { run: updateAvatar } = useFetch(updateAvatarConfig)
  const { run: updateName } = useFetch(updateNameConfig)
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

      <div className="editName">
        {Editing
          ? <div className="editWrapper">
            <Input.Search
              size="small"
              placeholder="请输入新的昵称"
              className="editInput"
              searchButton={<span>确定</span>}
              onSearch={(value) => {
                if (value) {
                  updateName({ name: value }).then(res => {
                    dispatch({
                      type: 'userData/setData',
                      payload: {
                        name: value,
                      }
                    })
                    data.user.name = value
                    localStorageUtils.set(data)
                  })
                } else {
                  Message.info('不能修改昵称为空')
                }
                setEditing(!Editing)
              }}
            ></Input.Search>

          </div>
          : <div className="normalWrapper" style={{ fontSize: 18 }}>
            昵称：{userName}
            <IconEdit onClick={() => { setEditing(!Editing) }} />
          </div>
        }
      </div >
    </div >
  );
};
export default PersonalPage;
