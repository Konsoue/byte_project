import React, { useLayoutEffect } from 'react';
import { Tabs } from '@arco-design/web-react';
import useFetch from '@/hooks/useFetch';
import { useHistory } from 'react-router-dom'
import { newsUrl } from '@/Utils/urls'
import {
  ITabsPaneProps,
  INewTabProps,
  IResponceResult,
} from './types'
import { LS } from '@/Utils'
import { useReduxData, useReduxDispatch } from '@/redux'
const { TabPane } = Tabs;

const NewTabs: React.FC<INewTabProps> = (props) => {
  const { topRef } = props;
  const newsTabId = useReduxData(['newsTab', 'data', 'id']);
  const newsTab = useReduxData(['newsTab', 'data', 'newsType']) as ITabsPaneProps[];
  const newsKeyword = useReduxData(['newsTab', 'data', 'keyword']);
  const dispatch = useReduxDispatch()
  const { location: { pathname }, push: pushRoute } = useHistory();
  const { run: getNewsType, data: newsType } = useFetch({
    url: newsUrl.getNewsType
  })

  useLayoutEffect(() => {
    const newsType = LS.getItem('newsType');
    if (!newsType) getNewsType();
    else {
      let id = newsTabId;
      if (!newsTabId && pathname === '/') id = newsTab[0].id;
      dispatch({
        type: 'newsTab/setData',
        payload: {
          newsType,
          id
        }
      })
    }
  }, [])

  useLayoutEffect(() => {
    if (newsType) {
      const { data } = newsType as IResponceResult;
      if (!LS.getItem('newsType')) LS.setItem('newsType', data);
      let id = newsTabId;
      if (!newsTabId) id = data[0].id;
      dispatch({ type: 'newsTab/setData', payload: { newsType: data, id } })
    }
  }, [newsType])

  const tabChange = (key: string) => {
    dispatch({ type: 'newsTab/setData', payload: { id: key, keyword: '' } })
    dispatch({ type: 'newsDigest/setData', payload: { current: 1 } })
    if (topRef) topRef.current?.click();
  }

  const clickTab = (key: string) => {
    if (newsKeyword !== '') tabChange(key);
    pushRoute('/');
  }

  return (
    <Tabs className="header-tabs"
      activeTab={newsTabId}
      onChange={tabChange}
      onClickTab={clickTab}
    >
      {
        newsTab.map(news => <TabPane key={news.id} title={news.name} />)
      }
    </Tabs>
  )
}

export default NewTabs;