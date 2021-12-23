import React, { useMemo } from 'react';
import { Avatar, Trigger, Modal } from '@arco-design/web-react';
import { useHistory } from 'react-router-dom'
import localStorageUtils from '@/Utils/localStorageUtils'
import { IPubAvatarProps, IUserContentProps } from './types';
import { LS } from '@/Utils'
import { useReduxDispatch } from '@/redux';
const UserContent: React.FC<IUserContentProps> = (props) => {
  const history = useHistory();
  const dispatch = useReduxDispatch();
  const modalConfig = {
    title: '退出登录',
    content: '是否确认退出登录',
    onOk: () => {
      localStorageUtils.unset();
      LS.clear();
      window.location.reload();
    },
    closable: true,
  }

  const loginOut = () => {
    Modal.info(modalConfig)
  }

  const toUserPage = (url: string) => {
    history.push(url);
    dispatch({ type: 'newsTab/setData', payload: { id: false, keyword: '' } })
  }

  return (
    <div className="content-container">
      <p className="content-item" onClick={() => toUserPage('/user/personal')}>
        <span className="item-icon">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M24 3c5.523 0 10 4.477 10 10s-4.477 10-10 10-10-4.477-10-10S18.477 3 24 3zm18 35c0-7.714-6.477-12-12-12H18c-5.523 0-12 4.292-12 12v6a2 2 0 002 2h32a2 2 0 002-2v-6zm-12-8c3.742 0 8 2.956 8 8v4H10v-4c0-5.188 4.34-8 8-8h12zM18 13a6 6 0 1112 0 6 6 0 01-12 0z" fill="currentColor" /></svg>
        </span>
        <span className="item-word">
          个人中心
        </span>
      </p>
      <p className="content-item" onClick={() => toUserPage('/user/mySettings')}>
        <span className="item-icon">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M28.767 2.71A21.685 21.685 0 0024 2.182c-1.618 0-3.215.178-4.768.528l-.897.202-2.795 6.373-6.883-.752-.622.677a21.82 21.82 0 00-4.772 8.295l-.27.872L7.089 24 3.53 28.886l-.537.737.27.872a21.82 21.82 0 004.772 8.295l.622.677 6.883-.752 2.426 5.531.369.842.896.202c1.554.35 3.15.528 4.769.528 1.618 0 3.214-.178 4.767-.528l.897-.201 2.796-6.374 6.883.752.622-.677a21.82 21.82 0 004.771-8.294l.27-.871L40.912 24l3.559-4.887.537-.738-.27-.87a21.82 21.82 0 00-4.772-8.295l-.622-.677-6.883.752-2.796-6.373-.897-.202zM20.916 6.08A18.109 18.109 0 0124 5.818c1.043 0 2.073.089 3.084.263l2.24 5.109a2.976 2.976 0 003.05 1.763l5.507-.603a18.182 18.182 0 013.096 5.382l-3.289 4.516a2.976 2.976 0 000 3.504l3.289 4.516a18.182 18.182 0 01-3.096 5.382l-5.508-.603a2.976 2.976 0 00-3.049 1.763l-2.24 5.109c-1.011.174-2.041.263-3.084.263-1.043 0-2.073-.089-3.084-.263l-2.24-5.108a2.976 2.976 0 00-3.05-1.764l-5.508.603a18.185 18.185 0 01-3.095-5.383l3.289-4.515c.76-1.044.76-2.46 0-3.504l-3.29-4.515a18.186 18.186 0 013.096-5.383l5.509.603a2.976 2.976 0 003.049-1.763l2.24-5.109zM24 14.91c5.004 0 9.056 4.072 9.056 9.091 0 5.019-4.052 9.09-9.056 9.09S14.944 29.02 14.944 24s4.052-9.09 9.056-9.09zM18.58 24c0-3.014 2.429-5.454 5.42-5.454s5.42 2.44 5.42 5.454-2.429 5.455-5.42 5.455-5.42-2.44-5.42-5.455z" fill="currentColor" /></svg>
        </span>
        <span className="item-word">
          应用设置
        </span>
      </p>
      <p className="content-item" onClick={loginOut}>
        <span className="item-icon">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M32 7.664C39.064 10.75 44 17.8 44 26c0 11.046-8.954 20-20 20S4 37.046 4 26c0-8.201 4.936-15.25 12-18.336v4.476C11.218 14.907 8 20.078 8 26c0 8.837 7.163 16 16 16s16-7.163 16-16c0-5.922-3.218-11.093-8-13.86V7.664zM22 26V4a1 1 0 011-1h2a1 1 0 011 1v22a1 1 0 01-1 1h-2a1 1 0 01-1-1z" fill="currentColor" /></svg>
        </span>
        <span className="item-word">
          退出登录
        </span>
      </p>
    </div>
  )
}

const PubAvatar: React.FC<IPubAvatarProps> = (props) => {
  const { login, avatarUrl } = props;
  const history = useHistory();

  const userAvatar = useMemo(() => {
    if (!login) return (<Avatar onClick={() => history.push('/login')}>未登录</Avatar>)
    return (
      <Trigger
        showArrow
        arrowProps={{
          style: { background: 'white', zIndex: 5 }
        }}
        position='bottom'
        trigger='click'
        popup={() => <UserContent />}
      >
        <Avatar
          style={{ backgroundColor: 'var(--theme-background)' }}
        >
          <img src={avatarUrl} alt="avatar" />
        </Avatar>
      </Trigger>
    )
  }, [login, avatarUrl])

  return (
    <div className="pub-avatar">
      {userAvatar}
    </div>
  )
}

export default PubAvatar;