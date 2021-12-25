import React, { useState } from "react";
import { useReduxDispatch } from '@/redux'
import { Button, Message, Radio, Tree } from '@arco-design/web-react'
import {
  InewsTab,
  InewsTree
} from './types'
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

const pink = {
  '--theme-color-text': 'rgb(255, 151, 168)',
  '--theme-color-background': 'rgb(255, 151, 168)',
  defaultLabel: 'pink'
}

const blue = {
  '--theme-color-text': 'rgba(23, 93, 254)',
  '--theme-color-background': 'rgba(23, 93, 254)',
  defaultLabel: 'blue'
}

const green = {
  '--theme-color-text': 'rgb(51, 189, 85)',
  '--theme-color-background': 'rgb(51, 189, 85)',
  defaultLabel: 'green'
}

const purple = {
  '--theme-color-text': 'rgba(149, 20, 255, 0.938)',
  '--theme-color-background': 'rgba(149, 20, 255, 0.938)',
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

  let useDark = LS.getItem('theme') || light
  let selectedSize = LS.getItem('fontSize')
  let selectedColor = LS.getItem('themeColor')
  const [theme, setTheme] = useState(useDark.defaultLabel)
  const setProperties = (obj: Object) => {
    const body = document.querySelector('body')
    for (let key of Object.keys(obj)) {
      body?.style.setProperty(key, obj[key])
    }
  }
  const newsType = LS.getItem('newsType');
  let TreeData = newsType.map((res: InewsTab) => {
    return {
      title: res.name,
      key: res.id
    }
  })
  const dispatch = useReduxDispatch()
  const [treeData, setTreeData] = useState(TreeData)
  const [checked, setChecked] = useState(false)
  const [draggable, setDraggable] = useState(false)
  const [checkedKeys, setCheckedKeys] = useState<string[]>([])
  const [temp, setTemp] = useState<string[]>([])

  const setNewsTypeData = (data: InewsTree[]) => {
    let newsTypes = data.map((res: InewsTree) => {
      return {
        name: res.title,
        id: res.key
      }
    })
    dispatch({
      type: 'newsTab/setData',
      payload: {
        newsType: newsTypes
      }
    })
    LS.setItem('newsType', newsTypes)
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
            switch (e) {
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
            switch (e) {
              case 'pink': {
                setProperties(pink)
                LS.setItem('themeColor', pink)
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
              default: {
                setProperties(blue)
                LS.setItem('themeColor', blue)
                break;
              }
            }
          }}
        >
        </RadioGroup>
      </div>
      <div className="tabChange">
        <div className="title">新闻栏目设置 : </div>
        <Tree
          draggable={draggable}
          checkable={checked}
          onDrop={({ dragNode, dropNode }) => {
            let data = [...treeData]
            const dragIndex = data.findIndex((item) => item.key === dragNode?.props._key);
            const dropIndex = data.findIndex((item) => item.key === dropNode?.props._key);
            const dragItem = data[dragIndex];
            data.splice(dragIndex, 1)
            data.splice(dropIndex, 0, dragItem)
            setTreeData([...data])
          }}
          onCheck={(checkedKeys) => {
            // checkedKeys指的是所有checked过的元素，包括已经被删除的
            setCheckedKeys(checkedKeys)
          }}
          treeData={treeData}
        >
        </Tree>

        {checked ?
          <div className="btnList">
            <Button
              type="primary"
              style={{ marginLeft: 10 }}
              onClick={() => {
                let data = [...treeData]
                if (data.length === 1) {
                  Message.info('至少保留一个栏目');
                  return;
                }
                // 用currentChecked来储存当前被checked，不包括被删除的
                let currentChecked = checkedKeys.filter(item => !temp.includes(item))
                setTemp(checkedKeys);
                currentChecked.forEach(key => {
                  const keyIndex = parseInt(key)
                  const index = data.findIndex((item) => parseInt(item.key) === keyIndex)
                  data.splice(index, 1)
                })
                setTreeData([...data])
              }}
            >
              删除
        </Button>
            <Button
              type="primary"
              style={{ marginLeft: 10 }}
              onClick={() => {
                setChecked(!checked)
                setDraggable(!draggable)
                setNewsTypeData(treeData)
                Message.info('设置成功！')
              }}
            >
              保存
        </Button>
          </div>
          :
          <Button
            type="primary"
            style={{ marginLeft: 20 }}
            onClick={() => {
              setChecked(!checked)
              setDraggable(!draggable)
            }}
          >
            设置
        </Button>
        }

      </div>
    </div>
  );
};
export default MySettings;
