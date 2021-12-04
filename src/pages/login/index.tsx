import React, { useEffect } from "react";
import { Layout } from '@arco-design/web-react';
// import { useHistory } from 'react-router-dom'
// import useFetch from '@/hooks/useFetch';
// import { userUrl } from '@/Utils/urls'

const { Header, Content, Footer } = Layout;

const Login: React.FC = () => {
  return (
    <div>
      <Layout style={{ height: '400px' }}>
        <Header>Header</Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
    </div>
  )
}

export default Login