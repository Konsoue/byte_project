/*
 * @Author: your name
 * @Date: 2021-12-06 21:39:41
 * @LastEditTime: 2021-12-08 20:29:46
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \byte_project\src\pages\user\personal\index.tsx
 */
import React from "react";
import '@/theme.scss'
import './index.scss'
import { LS } from '@/Utils'
const index: React.FC = () => {
  // 修改头像
  // 修改昵称
  const theme = LS.getItem('useDark')
  const fontSize = LS.getItem('fontSize')
  const themeColor = LS.getItem('themeColor')
  return (
    <div className={`personal-page ${theme} ${fontSize} ${themeColor}`}>
      <div>哈哈哈哈哈</div>
    </div>
  );
};
export default index;
