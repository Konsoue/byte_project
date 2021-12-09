/*
 * @Author: your name
 * @Date: 2021-12-06 21:39:41
 * @LastEditTime: 2021-12-08 22:55:25
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \byte_project\src\pages\user\mySettings\index.tsx
 */
import React, { useState, useContext } from "react";
import { Button, Radio } from '@arco-design/web-react'
import { UserContext } from '../index'
import '@/theme.scss'
import './index.scss'
import { LS } from '@/Utils'

const RadioGroup = Radio.Group;
const fontSizeOption = [
  {
    value: 'small',
    label: '小'
  },
  {
    value: 'medium',
    label: '中'
  },
  {
    value: 'large',
    label: '大'
  }
]

const themeColorOption = [
  {
    value: 'pink',
    label: '粉'
  },
  {
    value: 'green',
    label: '绿'
  },
  {
    value: 'blue',
    label: '蓝'
  },
  {
    value: 'purple',
    label: '紫'
  }
]


const MySettings: React.FC = (props) => {
  // 用户可以设置主题色、字体大小、日间/夜间模式
  let useDark = LS.getItem('useDark') || 'light'
  const [theme, setTheme] = useState(useDark);
  useDark = (theme === 'light') ? 'dark' : 'light';

  let selectedSize = LS.getItem('fontSize') || 'small'
  const [fontSize, setFontSize] = useState(selectedSize)

  let selectedColor = LS.getItem('themeColor') || 'blue'
  const [themeColor, setThemeColor] = useState(selectedColor)

  const dispatch = useContext(UserContext);

  return (
    <div className={`settingPage ${theme} ${fontSize} ${themeColor}`}>
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

      <div className="fontSize">
        字体：
        <RadioGroup
          options={fontSizeOption}
          size='large'
          type='button'
          defaultValue={`${selectedSize}`}
          style={{
            marginTop: 20
          }}
          onChange={(e) => {
            setFontSize(e)
            dispatch({ type: 'flash' })
            LS.setItem('fontSize', e)
          }}
        >
        </RadioGroup>
      </div>
      <div className="themeColor">
        主题色：
      <RadioGroup
          options={themeColorOption}
          type='button'
          size='large'
          defaultValue={`${selectedColor}`}
          onChange={(e) => {
            setThemeColor(e)
            dispatch({ type: 'flash' })
            LS.setItem('themeColor', e)
          }}
        >
        </RadioGroup>
      </div>

    </div>
  );
};
export default MySettings;
