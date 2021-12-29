import React, { useState, useEffect } from "react";
import Chart from '@/common/Chart'
import useFetch from "@/hooks/useFetch";
import { logUrl } from '@/Utils/urls'
import { is, LS } from '@/Utils'
import { IResponseResult, ILogsXAxis } from './types'
import { Switch } from '@arco-design/web-react';
import { EChartsOption } from 'echarts'
import './index.scss'
// 后台不同 type 对应不同的 x 坐标
const logsXAxis = {
  useTime: (() => {
    const res = []
    for (let i = 0; i < 24; i++) {
      res.push(i + '时');
    }
    return res;
  })(),
  typeTime: (() => {
    const newType = LS.getItem('newsType');
    return newType?.map?.((item: any) => item.name)
  })()
}

// 周/月对应的图标标题
const typeTotitle = {
  1: {
    useTime: '本周不同时段操作次数',
    typeTime: '本周访问不同新闻类型次数'
  },
  2: {
    useTime: '本月不同时段操作次数',
    typeTime: '本月访问不同新闻类型次数'
  }
}

// 基本共用配置
const option: EChartsOption = {
  title: {
    text: typeTotitle[1].useTime,
    left: "center",
    textStyle: {},
  },
  xAxis: {
    type: 'category',
    data: logsXAxis.useTime
  },
  yAxis: {
    type: 'value'
  },
  tooltip: {
    trigger: 'axis',
  },
  textStyle: {},
  series: [
  ]
};

// 获取主题字体颜色
const getTextColor = () => {
  return getComputedStyle(document.body).getPropertyValue('--theme-text')
}

/**
 * 创建图表的 typeTimeOption
 * @param typeTimes
 * @param logType
 * @returns
 */
const createTypeTimeOption = (
  typeTimes: any[],
  logType: number,
  option: EChartsOption,
  logsXAxis: ILogsXAxis
) => {
  const typeYAxisData = typeTimes?.filter((item: any) => !is.Void(item)) || [];
  const newTypeTimeOption = JSON.parse(JSON.stringify(option));
  newTypeTimeOption.series[0] = {
    data: typeYAxisData,
    type: 'bar',
    name: '访问次数'
  }
  const themeText = getTextColor()
  newTypeTimeOption.textStyle.color = themeText;
  newTypeTimeOption.title.textStyle.color = themeText;
  newTypeTimeOption.title.text = typeTotitle[logType].typeTime;
  newTypeTimeOption.xAxis.data = logsXAxis.typeTime;
  return newTypeTimeOption;
}

/**
 * 创建图表的 useTimeOption
 * @param useTimes
 * @param logType
 * @returns
 */
const createUseTimeOption = (
  useTimes: any[],
  logType: number,
  option: EChartsOption,
  logsXAxis: ILogsXAxis
) => {
  const newUseTimeOption = JSON.parse(JSON.stringify(option));
  newUseTimeOption.series[0] = {
    data: useTimes,
    type: 'line',
    name: '操作次数'
  }
  const themeText = getTextColor()
  newUseTimeOption.textStyle.color = themeText;
  newUseTimeOption.title.textStyle.color = themeText;
  newUseTimeOption.title.text = typeTotitle[logType].useTime;
  newUseTimeOption.xAxis.data = logsXAxis.useTime;
  return newUseTimeOption;
}

const MyReport: React.FC = () => {
  // 用户可以在使用报告中看到自己本周/本月浏览的新闻关键词的词云
  // 用户可看看到自己使用最关注的频道是哪个，每个频道的浏览量
  // 最常使用 app 的时间段等等
  const [logType, setLogType] = useState(1);
  const [useTimeOption, setUseTime] = useState(option);
  const [typeTime, setTypeTime] = useState(option);
  const { run: getMyLogs, data: logData, loading: logsLoding } = useFetch({
    url: logUrl.getMyLogs,
    type: 'get'
  });

  useEffect(() => {
    getMyLogs({ type: logType })
  }, [logType])

  useEffect(() => {
    if (logData) {
      const { data } = logData as IResponseResult;
      const typeOtion = createTypeTimeOption(data.typeTimes, logType, option, logsXAxis);
      const useTimeOption = createUseTimeOption(data.useTimeTimes, logType, option, logsXAxis);
      setUseTime(useTimeOption);
      setTypeTime(typeOtion);
    }
  }, [logData])

  const selectChange = (value: boolean, event: Event) => {
    value ? setLogType(1) : setLogType(2);
  }

  return (
    <div className='report-page'>
      <div className="report-header">
        <p className="title bold">个人使用习惯分析</p>
        <p className="control">
          <span className="bold margin-right-large">显示本周/本月:</span>
          <Switch
            type='round'
            checked={logType === 1}
            onChange={selectChange}
            checkedIcon={<span>周</span>}
            uncheckedIcon={<span>月</span>}
            loading={logsLoding}
          />
        </p>
      </div>
      <div className="charts-container">
        <div className="left">
          <Chart
            chartOptions={useTimeOption}
            id='useTimeTimes'
            className='box-middle'
            loading={logsLoding}
          />
        </div>
        <div className="right">
          <Chart
            chartOptions={typeTime}
            id='typeTimes'
            className='box-middle'
            loading={logsLoding}
          />
        </div>
      </div>
    </div>
  )
};
export default MyReport;
