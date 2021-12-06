import React, { memo } from 'react';
import PubSearch from '@/common/PubSearch';
import PubAvatar from './PubAvatar'
import NewTabs from './NewTabs'
import './index.scss'

const Header: React.FC = (props) => {

  return (
    <div className="pub-header-container">
      <div className="pub-header">
        <div className="header-left">
          <div className="logo">Logo</div>
          <NewTabs />
        </div>
        <div className="header-middle">
          <PubSearch />
        </div>
        <div className="header-right">
          <PubAvatar />
        </div>
      </div>
    </div>
  )
}


export default memo(Header)