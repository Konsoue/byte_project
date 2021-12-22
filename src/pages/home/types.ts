export interface IHomeProps {}

export interface IForecast {
  date: string;
  fengli:string;
  fengxiang:string;
  high: string;
  low: string;
  type: string;
}

export interface IWeatherData {
  city: string;
  forecast: Array<IForecast>;
  ganmao: string;
  wendu: string;
  yesterday: object;
}