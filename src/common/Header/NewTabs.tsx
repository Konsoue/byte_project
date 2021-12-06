import React, { useState, useEffect } from 'react';
import { Tabs } from '@arco-design/web-react';
import useFetch from '@/hooks/useFetch';
import { newsUrl } from '@/Utils/urls'
import { ITabsPaneProps } from './types'

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

const NewTabs: React.FC = (props) => {
  const [newsTabArr, setArr] = useState<ITabsPaneProps[]>(defaultTabs);
  const { run } = useFetch({
    url: newsUrl.getNewsType
  })

  useEffect(() => {
    run()
      .then((res) => {
        const data = res.data;
        setArr(data)
      })
      .catch((err) => { })
  }, [])

  return (
    <Tabs className="header-tabs">
      {
        newsTabArr.map(news => <TabPane key={news.id} title={news.name} />)
      }
    </Tabs>
  )
}

export default NewTabs;