import React, { memo } from 'react';
import PubSearch from '@/common/PubSearch';
import PubAvatar from './PubAvatar'
import NewTabs from './NewTabs'
import { IHeaderProps } from './types'
import './index.scss'

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWFkZmJlOGJjOGM2OGViZTY5YWIwMjAiLCJlbWFpbCI6Ijg3NDExMTc1MkBxcS5jb20iLCJpYXQiOjE2Mzg3OTIxODcsImV4cCI6MTYzODg3ODU4N30.17Wxjp-VvmiQFqib6AHObNiSrw9Yc-IpiCiKBVF0Nf4`


const Header: React.FC<IHeaderProps> = (props) => {
  const { toFlash } = props;

  return (
    <div className="pub-header-container">
      <div className="pub-header">
        <div className="header-left">
          <div className="logo">Logo</div>
          <NewTabs toFlash={toFlash} />
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