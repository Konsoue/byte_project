import React from 'react';
import { Input } from '@arco-design/web-react';
import { useReduxDispatch } from '@/redux'
import { useHistory } from 'react-router-dom';
import { IPubSearchProps } from './type'
import './index.scss';

const InputSearch = Input.Search;

const PubSearch: React.FC<IPubSearchProps> = (props) => {
  const { clearSearch } = props;
  const history = useHistory();
  const dispatch = useReduxDispatch();

  const searchNews = (value: string) => {
    dispatch({ type: 'newsTab/setData', payload: { keyword: value } })
    dispatch({ type: 'newsDigest/setData', payload: { current: 1 } })
    history.push('/?search=' + value);
  }

  const clearWord = () => clearSearch?.()

  return (
    <div className="pub-search-conatiner">
      <InputSearch
        allowClear
        searchButton
        onSearch={searchNews}
        onClear={clearWord}
        placeholder='输入搜索关键词'
        style={{ width: '100%' }}
      />
    </div>
  )
}

export default PubSearch