export interface IResponseResult {
  data?: any;
}

export interface IlikesList {
  _id: string;
  content: string;
  time: string;
  title: string;
  commentId: string;
  newsId: string;
  userAvatar?: string;
  userName?: string;
}

export interface ILikeCardProps {
  commentId: string;
  content: string;
  newsId: string;
  time: string;
  id: string;
  userAvatar?: string;
  userName?: string;
}