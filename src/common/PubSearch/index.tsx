import React from 'react';
import { Input } from '@arco-design/web-react';

const InputSearch = Input.Search;

const PubSearch: React.FC = () => {
  return (
    <div className="pub-search-conatiner">
      <InputSearch
        allowClear
        placeholder='Enter keyword to search'
        style={{ width: 350 }}
      />
    </div>
  )
}

export default PubSearch