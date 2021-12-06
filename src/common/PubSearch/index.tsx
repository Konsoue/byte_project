import React, { useState } from 'react';
import { Input } from '@arco-design/web-react';
import './index.scss';

const InputSearch = Input.Search;

const PubSearch: React.FC = () => {
  const [loading, setLoad] = useState(false);

  const searchNews = async () => {
    setLoad(true);
    setLoad(false);
  }

  return (
    <div className="pub-search-conatiner">
      <InputSearch
        allowClear
        searchButton
        loading={loading}
        onSearch={searchNews}
        placeholder=''
        style={{ width: 350 }}
      />
    </div>
  )
}

export default PubSearch