import React, { useState, useEffect } from 'react';
import { Tabs } from '@arco-design/web-react';
import useFetch from '@/hooks/useFetch';
import { newsUrl } from '@/Utils/urls'
import { ITabsPaneProps, INewTabProps, IResponceResult } from './types'
import { SS } from '@/Utils'
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

const NewTabs: React.FC<INewTabProps> = (props) => {
  const { toFlash } = props;
  const [newsTabArr, setArr] = useState<ITabsPaneProps[]>(defaultTabs);

  const { run: getNewsType, data: newsType } = useFetch({
    url: newsUrl.getNewsType
  })

  const { run: getNewsDigest, data: newsDigest } = useFetch({
    url: newsUrl.getNewsDigest,
    type: 'get'
  })

  useEffect(() => {
    getNewsType({ data: {} })
  }, [])

  useEffect(() => {
    if (newsType) {
      const { data } = newsType as IResponceResult;
      setArr(data);
      const type = data[0].id
      getNewsDigest({ type })
    }
  }, [newsType])

  useEffect(() => {
    if (newsDigest) {
      const { data } = newsDigest as IResponceResult;
      SS.setItem('newsDigest', data);
      toFlash?.({ type: 'flash' })
    }
  }, [newsDigest])

  const tabChange = (key: string) => {
    getNewsDigest({ type: key })
  }

  return (
    <Tabs className="header-tabs"
      onChange={tabChange}
    >
      {
        newsTabArr.map(news => <TabPane key={news.id} title={news.name} />)
      }
    </Tabs>
  )
}

export default NewTabs;