import React, {useState,useEffect} from "react";
import { Button, Radio } from '@arco-design/web-react'
import { LS } from '@/Utils'
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
  },
  {
    value: 'more',
    label: '更多'
  }
]



const light = {
  '--theme-background': '#FFF',
  '--theme-background-2': '#f0f2f5',
  '--theme-text': '#111',
  '--theme-border': '#E4E5EA',
  defaultLabel: 'light'
}
const night = {
  '--theme-background': '#111',
  '--theme-background-2': '#000',
  '--theme-text': '#e3e3e3',
  '--theme-border': '#303030',
  defaultLabel: 'night'
}

const pink =  {
  '--theme-color-text': '#FF97A8',
  '--theme-color-background': '#FF97A8',
  defaultLabel: 'pink'
}

const blue = {
  '--theme-color-text': '#175DFE',
  '--theme-color-background': '#175DFE',
  defaultLabel: 'blue'
}

const green = {
  '--theme-color-text': '#33BD55',
  '--theme-color-background': '#33BD55',
  defaultLabel: 'green'
}

const purple = {
  '--theme-color-text': '#9514FF',
  '--theme-color-background': '#9514FF',
  defaultLabel: 'purple'
}

const small = {
  '--theme-font-size': '14px',
  defaultLabel: 'small'
}
const medium = {
  '--theme-font-size': '16px',
  defaultLabel: 'medium'
}
const large = {
  '--theme-font-size': '18px',
  defaultLabel: 'large'
}


const MySettings: React.FC = (props) => {

  let useDark =  LS.getItem('theme') || light
  let selectedSize =  LS.getItem('fontSize')
  let selectedColor =  LS.getItem('themeColor')
const [theme, setTheme] = useState(useDark.defaultLabel)

  // 渲染完成后给color监听更多设置的变化
  useEffect(() => {
    const colorDom: HTMLFormElement = document.querySelector('.color-box') as HTMLFormElement
    colorDom && colorDom.addEventListener('change',()=>{
      // 获取改变的颜色并赋值
      const color = colorDom.value
      const more = {
        '--theme-color-text': color,
        '--theme-color-background': color,
        defaultLabel: 'more'
      }
      setProperties(more)
      LS.setItem('themeColor', more)
    })
  }, [])

  const setProperties = (obj: Object) => {
    const body = document.querySelector('body')
    for (let key of Object.keys(obj)) {
      body?.style.setProperty(key, obj[key])
    }
  }

  return (
    <div className='settingPage'>
      <Button
        type="primary"
        onClick={() => {
          setTheme(theme === 'light' ? 'night' : 'light')
          if (theme === 'night') {
            setProperties(light)
            LS.setItem('theme', light)

          } else {
            setProperties(night)
            LS.setItem('theme', night)
          }
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
          defaultValue={selectedSize.defaultLabel || 'small'}
          style={{
            marginTop: 20
          }}
          onChange={(e) => {
            switch(e) {
              case 'small': {
                setProperties(small)
                LS.setItem('fontSize', small)
                break;
              }
              case 'large': {
                setProperties(large)
                LS.setItem('fontSize', large)
                break;
              }
              default: {
                setProperties(medium)
                LS.setItem('fontSize', medium)
                break;
              }
            }
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
          defaultValue={selectedColor.defaultLabel || 'blue'}
          onChange={(e) => {
            // 拿到更多选择dom
            const dom: HTMLFormElement = document.querySelector('.color-box') as HTMLFormElement
            switch(e) {
              case 'pink': {
                setProperties(pink)
                LS.setItem('themeColor', pink)
                // colorDom&& colorDom.value = pink['--theme-color-background']
                break;
              }
              case 'green': {
                setProperties(green)
                LS.setItem('themeColor', green)
                break;
              }
              case 'purple': {
                setProperties(purple)
                LS.setItem('themeColor', purple)
                break;
              }
              case 'more': {
                dom.click()
                break;
              }
              default: {
                setProperties(blue)
                LS.setItem('themeColor', blue)
                break;
              }
            }
            // 实现每次更改改变颜色
            dom.value = LS.getItem('themeColor')['--theme-color-background']
          }}
        >
        </RadioGroup>
          <input type={'color'} className="color-box" title="更多颜色" defaultValue={selectedColor['--theme-color-background']}></input>
      </div>

    </div>
  );
};
export default MySettings;
