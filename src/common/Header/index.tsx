import React, { memo } from 'react';
import { Tabs } from '@arco-design/web-react';
import PubSearch from '@/common/PubSearch';
import './index.scss'

const { TabPane } = Tabs;

const Header: React.FC = (props) => {
  return (
    <div className="pub-header-container">
      <div className="pub-header">
        <div className="logo">Logo</div>
        <Tabs className="header-tabs">
          <TabPane key='1' title='Tab 1' />
          <TabPane key='2' title='Tab 2' />
          <TabPane key='3' title='Tab 3' />
        </Tabs>
        <PubSearch />
      </div>
    </div>
  )
}


export default memo(Header)