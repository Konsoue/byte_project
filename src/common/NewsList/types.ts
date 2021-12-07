export interface INewsListProps {
  toFlash?: Function;
  flash?: boolean;
}

export interface INewsList {
  _id: string;
  digest: string;
  img: string;
  publishTime: string;
  source: string;
  title: string;
}

export interface INewsDigest {
  records?: any[];
}

export interface IResponceResult {
  data?: any | INewsDigest
}