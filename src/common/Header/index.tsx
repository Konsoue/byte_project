/*
 * @Author: your name
 * @Date: 2021-12-07 22:51:34
 * @LastEditTime: 2021-12-10 22:33:54
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \byte_project\src\common\Header\index.tsx
 */
import React, { memo, useMemo } from 'react';
import PubSearch from '@/common/PubSearch';
import PubAvatar from './PubAvatar'
import NewTabs from './NewTabs'
import { IHeaderProps, IPubAvatarProps } from './types'
import localStorageUtils from '@/Utils/localStorageUtils'
import './index.scss'

const Header: React.FC<IHeaderProps> = (props) => {
  const { toFlash, flash } = props;

  const loginData: IPubAvatarProps = useMemo(() => {
    const data = localStorageUtils.get();
    if (JSON.stringify(data) === '{}') {
      return { login: false }
    } else {
      return { login: true, avatarUrl: data.user.avatar }
    }
  }, [flash])
  

  return (
    <div className="pub-header-container">
      <div className="pub-header">
        <div className="header-left">
          <div className="logo"><div className="title-font"></div></div>
          <NewTabs toFlash={toFlash} />
        </div>
        <div className="header-middle">
          <PubSearch />
        </div>
        <div className="header-right">
          <PubAvatar
            {...props}
            login={!!loginData?.login}
            avatarUrl={loginData?.avatarUrl}
          />
        </div>
      </div>
    </div>
  )
}


export default memo(Header)