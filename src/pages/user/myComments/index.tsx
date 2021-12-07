import React, { useEffect } from "react";
import useFetch from '@/hooks/useFetch';
import { commentUrl } from '@/Utils/urls'
import { List } from '@arco-design/web-react';

const MyComments: React.FC = () => {
  const { run: getCommentsArr } = useFetch({
    url: commentUrl.getMyComments,
    type: 'GET',
  })
  useEffect(() => {
    getCommentsArr({
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
export default MyComments;
