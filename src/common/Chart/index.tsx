import { useLayoutEffect } from 'react';
import * as echarts from 'echarts'
import './index.scss'
import { IChartProps, IEChartsOption } from './type'

// 基本共用配置
const defaultOption: IEChartsOption = {
  title: {
    text: '正在加载中',
    left: "center",
  },
  xAxis: {
    type: 'category',
    data: []
  },
  yAxis: {
    type: 'value'
  },
  series: [
  ]
};


const Chart: React.FC<IChartProps> = (props) => {
  const { chartOptions, className, id = 'chart', loading } = props
  useLayoutEffect(() => {
    let chartDom = document.getElementById(id)!;
    let myChart = echarts.init(chartDom);
    myChart.setOption(loading ? defaultOption : chartOptions);
  }, [chartOptions, loading])

  return (
    <div id={id} className={`chart ${className}`}>
    </div>
  )
}

export default Chart;