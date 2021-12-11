import React from "react";
import { Button, Radio } from '@arco-design/web-react'
import { useReduxData, useReduxDispatch } from '@/redux'
import { LS } from '@/Utils'
import '@/theme.scss'
import './index.scss'

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

  const theme = useReduxData(['settingsData', 'theme'])
  const fontSize = useReduxData(['settingsData', 'fontSize'])
  const themeColor = useReduxData(['settingsData', 'themeColor'])
  const dispatch = useReduxDispatch()
  let useDark = theme || LS.getItem('theme')
  let selectedSize = fontSize || LS.getItem('fontSize')
  let selectedColor = themeColor || LS.getItem('themeColor')

  return (
    <div className='settingPage'>
      <Button
        type="primary"
        onClick={() => {
          useDark = (theme === 'light') ? 'dark' : 'light'
          dispatch({
            type: 'settingsData/setTheme',
            payload: {
              theme: useDark
            }
          })
          LS.setItem('theme', useDark)
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
            dispatch({
              type: 'settingsData/setFontSize',
              payload: {
                fontSize: e
              }
            })
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
            dispatch({
              type: 'settingsData/setThemeColor',
              payload: {
                themeColor: e
              }
            })
            LS.setItem('themeColor', e)
          }}
        >
        </RadioGroup>
      </div>

    </div>
  );
};
export default MySettings;
