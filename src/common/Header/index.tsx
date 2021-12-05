import React, { memo } from 'react';
import { Tabs } from '@arco-design/web-react';
import PubSearch from '@/common/PubSearch';
import PubAvatar from './PubAvatar'
import './index.scss'

const { TabPane } = Tabs;

const Header: React.FC = (props) => {


  return (
    <div className="pub-header-container">
      <div className="pub-header">
        <div className="header-left">
          <div className="logo">Logo</div>
          <Tabs className="header-tabs">
            <TabPane key='1' title='Tab 1' />
            <TabPane key='2' title='Tab 2' />
            <TabPane key='3' title='Tab 3' />
          </Tabs>
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