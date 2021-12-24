export interface INewsListProps {
  showCard?: boolean;
  isSearch?: boolean;
  clearSearch?: Function;
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