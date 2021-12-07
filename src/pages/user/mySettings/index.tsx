/*
 * @Author: your name
 * @Date: 2021-12-06 21:39:41
 * @LastEditTime: 2021-12-07 20:26:07
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \byte_project\src\pages\user\mySettings\index.tsx
 */
import React, { useState, useContext } from "react";
import { Button } from '@arco-design/web-react'
import { UserContext } from '../index'
import '@/theme.scss'
import './index.scss'
import { LS } from '@/Utils'

const MySettings: React.FC = (props) => {
  console.log(props)
  // 用户可以设置主题色、字体大小、日间/夜间模式
  let useDark = LS.getItem('useDark') || 'light'
  const [theme, setTheme] = useState(useDark);
  useDark = (theme === 'light') ? 'dark' : 'light';
  const dispatch = useContext(UserContext);

  return (
    <div className={`settingPage ${theme}`}>
      <Button
        type="primary"
        onClick={() => {
          setTheme(useDark)
          dispatch({ type: 'flash' })
          LS.setItem('useDark', useDark)
        }}
      >
        {theme === 'light' ? '日间模式' : '夜间模式'}
      </Button>
      <div>hdashduhs oi</div>
    </div>
  );
};
export default MySettings;
