/*
 * @Author: your name
 * @Date: 2021-12-07 22:51:34
 * @LastEditTime: 2021-12-23 17:16:17
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \byte_project\src\common\PubSearch\index.tsx
 */
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
        style={{ width: '100%' }}
      />
    </div>
  )
}

export default PubSearch