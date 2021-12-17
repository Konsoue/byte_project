
export interface IResponseResult {
  data?: any;
}

export interface INewsList {
  _id: string;
  digest: string;
  img: string;
  publishTime: string;
  source: string;
  title: string;
  newsId?: string;
}