/*
 * @Author: your name
 * @Date: 2021-12-06 21:39:41
 * @LastEditTime: 2021-12-07 16:44:08
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \byte_project\src\pages\user\personal\index.tsx
 */
import React from "react";
import { Button } from '@arco-design/web-react'
import '@/theme.scss' 
import './index.scss'
import { LS } from '@/Utils'
const index: React.FC = () => {
  // 修改头像
  // 修改昵称
  const theme = LS.getItem('useDark')
  return (
  <div className={`personal-page ${theme}`}>
    <div>djsiajds </div>
  </div>
  );
};
export default index;
