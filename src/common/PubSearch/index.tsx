import React, { useEffect, useMemo, useState } from 'react';
import { Input } from '@arco-design/web-react';
import useFetch from '@/hooks/useFetch';
import { newsUrl } from '@/Utils/urls';
import { useReduxData, useReduxDispatch } from '@/redux'
import { useHistory, useLocation } from 'react-router-dom';
import { debounce } from '@/Utils'
import './index.scss';

const InputSearch = Input.Search;

const PubSearch: React.FC = () => {
  const newsTabId = useReduxData(['newsTab', 'data', 'id']);
  const newsType = useReduxData(['newsTab', 'data', 'newsType']);
  const newsCurrent = useReduxData(['newsDigest', 'data', 'current']);
  const history = useHistory();
  const location = useLocation();
  const [keyword, setKeyword] = useState('');
  const dispatch = useReduxDispatch();
  const { data, loading, run } = useFetch({
    url: newsUrl.getNewsDigest,
    type: 'get'
  })

  useEffect(() => {
    const { pathname } = location;
    if (data) {
      const { data: { records } } = data as any;
      dispatch({
        type: 'newsDigest/setData',
        payload: {
          news: records || [],
          current: 1
        }
      })
      if (pathname !== '/') {
        dispatch({
          type: 'newsTab/setData', payload: {
            id: newsType[0].id,
          }
        })
        history.push('/');
      };
    }
  }, [data])

  useEffect(() => {
    if (!newsCurrent) setKeyword('');
  }, [newsCurrent])

  const searchNews = async (value: string) => {
    run({
      type: newsTabId ? newsTabId : newsType[0].id,
      keyword: value
    })
    history.push('/?search=' + value);
  }

  const changeWord = (value: string, e: Event) => {
    dispatch({ type: 'newsTab/setData', payload: { keyword: value } })
  }

  const clearWord = () => {
    setKeyword('');
    dispatch({ type: 'newsTab/setData', payload: { keyword: '' } })
  }

  const change = useMemo(() => {
    return debounce(changeWord, 500);
  }, [])

  useEffect(() => {
    change(keyword);
  }, [keyword])

  return (
    <div className="pub-search-conatiner">
      <InputSearch
        allowClear
        searchButton
        loading={loading}
        onChange={(value: string) => { setKeyword(value); }}
        onSearch={searchNews}
        onClear={clearWord}
        value={keyword}
        placeholder='输入搜索关键词'
        style={{ width: '100%' }}
      />
    </div>
  )
}

export default PubSearch