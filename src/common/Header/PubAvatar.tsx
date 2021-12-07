import React, { useMemo } from 'react';
import { Avatar, Trigger } from '@arco-design/web-react';
import { useHistory } from 'react-router-dom'
import { IPubAvatarProps } from './types';

const UserContent: React.FC = () => {
  return (
    <div className="content-container">
      <p className="content-item">
        <span className="item-icon">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M24 3c5.523 0 10 4.477 10 10s-4.477 10-10 10-10-4.477-10-10S18.477 3 24 3zm18 35c0-7.714-6.477-12-12-12H18c-5.523 0-12 4.292-12 12v6a2 2 0 002 2h32a2 2 0 002-2v-6zm-12-8c3.742 0 8 2.956 8 8v4H10v-4c0-5.188 4.34-8 8-8h12zM18 13a6 6 0 1112 0 6 6 0 01-12 0z" fill="currentColor" /></svg>
        </span>
        <span className="item-word">
          个人中心
        </span>
      </p>
      <p className="content-item">
        <span className="item-icon">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M24 3c5.523 0 10 4.477 10 10s-4.477 10-10 10-10-4.477-10-10S18.477 3 24 3zm18 35c0-7.714-6.477-12-12-12H18c-5.523 0-12 4.292-12 12v6a2 2 0 002 2h32a2 2 0 002-2v-6zm-12-8c3.742 0 8 2.956 8 8v4H10v-4c0-5.188 4.34-8 8-8h12zM18 13a6 6 0 1112 0 6 6 0 01-12 0z" fill="currentColor" /></svg>
        </span>
        <span className="item-word">
          个人中心
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
        <Avatar><img src={avatarUrl} alt="avatar" /></Avatar>
      </Trigger>
    )
  }, [login])

  return (
    <div className="pub-avatar">
      {userAvatar}
    </div>
  )
}

export default PubAvatar;