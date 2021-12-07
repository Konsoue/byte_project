import React, { useEffect } from "react";
import useFetch from '@/hooks/useFetch';
import { likeUrl } from '@/Utils/urls'
import { List } from '@arco-design/web-react';


const MyLikes: React.FC = () => {

  const { run: getMyLikes } = useFetch({
    url: likeUrl.getMyLikes,
    type: 'GET',
  })
  useEffect(() => {
    getMyLikes({
      size: '10',
      current: '1'
    })
      .then((res) => {
        const data = res.data;
        console.log(data)
      })
      .catch((err) => { })
  }, [])

  return (<List
    style={{ width: 1000 }}
    size='large'
    render={(item, index) => <List.Item key={index}>{item}</List.Item>}
  />)
};
export default MyLikes;