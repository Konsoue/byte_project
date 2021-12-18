import { EChartsOption } from 'echarts'


export interface IChart {

}

export interface IChartProps {
  chartOptions: EChartsOption;
  id: string;
  className?: string;
  loading?: boolean;
}

export type IEChartsOption = EChartsOption;