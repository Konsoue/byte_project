export interface IHomeAction {
  type: string;
}

export interface IHomeState {
  flash: boolean;
}

export interface INewsList {
  _id: string;
  digest: string;
  img: string;
  publishTime: string;
  source: string;
  title: string;
}