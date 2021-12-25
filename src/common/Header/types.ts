export interface IHeaderProps {
  topRef?: any;
  isSearch?: boolean;
  clearSearch?: Function;
}

export interface INewTabProps extends IHeaderProps {
}

export interface ITabsPaneProps extends IHeaderProps {
  id?: number | string;
  name?: string;
}
export interface IPubAvatarProps extends IHeaderProps {
  login?: boolean;
  avatarUrl?: string;
}

export interface INewsDigest {
  records: any[];
}

export interface IResponceResult {
  data?: any | INewsDigest
}


export interface IUserContentProps extends IPubAvatarProps {
}

export interface IForecast {
  date: string;
  fengli: string;
  fengxiang: string;
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