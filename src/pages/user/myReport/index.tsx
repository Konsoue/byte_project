/*
 * @Author: your name
 * @Date: 2021-12-06 21:39:41
 * @LastEditTime: 2021-12-08 22:54:27
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \byte_project\src\pages\user\myReport\index.tsx
 */
import React from "react";
import '@/theme.scss'
import './index.scss'
import { LS } from '@/Utils'

const index: React.FC = () => {
  // 用户可以在使用报告中看到自己本周/本月浏览的新闻关键词的词云
  // 用户可看看到自己使用最关注的频道是哪个，每个频道的浏览量
  // 最常使用 app 的时间段等等
  const theme = LS.getItem('useDark')
  const fontSize = LS.getItem('fontSize')
  const themeColor = LS.getItem('themeColor')
  return (
    <div className={`report-page ${theme} ${fontSize} ${themeColor}`}>
      user
    </div>
  )
};
export default index;
