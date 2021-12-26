export interface IResponseResult {
  data?: any;
}

export interface ICommentsList {
  _id: string;
  newsId: string;
  content: string;
  newsTitle?: string;
  time: string;
  title: string;
  userAvatar?: string;
  userName?: string;
  newsImg?:string;
}

export interface IComCardProps {
  newsTitle?: string;
  content: string;
  newsId: string;
  time: string;
  id: string;
  userAvatar?: string;
  userName?: string;
  newsImg?:string;
}