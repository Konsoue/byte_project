import React, { useState, useEffect } from 'react';
import { Tabs } from '@arco-design/web-react';
import useFetch from '@/hooks/useFetch';
import { useHistory } from 'react-router-dom'
import { newsUrl } from '@/Utils/urls'
import {
  ITabsPaneProps,
  INewTabProps,
  IResponceResult,
} from './types'
import { SS, LS } from '@/Utils'
const { TabPane } = Tabs;

const defaultTabs = [
  {
    name: '推荐',
    id: '1'
  },
  {
    name: '热点',
    id: '2'
  },
  {
    name: '科技',
    id: '3'
  },
]

let newTabsList = [] as ITabsPaneProps[];
let newsActiveTab: string = '';

const NewTabs: React.FC<INewTabProps> = (props) => {
  const { toFlash } = props;
  const [reloadTabs, setReloadTab] = useState(false);
  const { location: { pathname }, push: pushRoute } = useHistory();
  const { run: getNewsType, data: newsType } = useFetch({
    url: newsUrl.getNewsType
  })

  const { run: getNewsDigest, data: newsDigest } = useFetch({
    url: newsUrl.getNewsDigest,
    type: 'get'
  })

  useEffect(() => {
    getNewsType()
  }, [])

  useEffect(() => {
    if (newsType) {
      if (!pathname.includes('/user')) {
        const { data } = newsType as IResponceResult;
        const typeId = SS.getItem('newsTypeId') || data[0].id;
        SS.setItem('newsTypeId', typeId);
        if (!LS.getItem('newsType')) {
          LS.setItem('newsType', data);
        }
        getNewsDigest({ type: typeId });
        setReloadTab(!reloadTabs);
      }
    }
  }, [newsType])

  // 按需刷新 Tabs，例如获取 newType，排序 newType 后刷新页面
  useEffect(() => {
    newTabsList = LS.getItem('newsType') || defaultTabs;
  }, [reloadTabs])

  // 获取新闻列表
  useEffect(() => {
    if (newsDigest) {
      const { data: { records: data } } = newsDigest as IResponceResult;
      SS.setItem('newsDigest', data);
      toFlash?.({ type: 'flash' });
    }
  }, [newsDigest])

  const tabChange = (key: string) => {
    SS.setItem('newsTypeId', key);
    if (pathname !== '/') pushRoute('/')
    else {
      setReloadTab(!reloadTabs);
      getNewsDigest({ type: key });
    }
  }
  newsActiveTab = SS.getItem('newsTypeId');

  return (
    <Tabs className="header-tabs"
      activeTab={newsActiveTab}
      onChange={tabChange}
    >
      {
        newTabsList.map(news => <TabPane key={news.id} title={news.name} />)
      }
    </Tabs>
  )
}

export default NewTabs;