import React from "react";
import { Link } from 'react-router-dom';
import './index.scss'

const NotFound: React.FC = () => {
  return (
    <div className="not-found">
      <Link to="/">
        <button className="btn btn-primary">返回首页</button>
      </Link>
    </div>
  )
}

export default NotFound;