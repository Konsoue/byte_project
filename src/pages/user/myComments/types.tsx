export interface IResponseResult {
  data?: any;
}

export interface ICommentsList {
  _id: string;
  newsId: string;
  content: string;
  commentId: string;
  time: string;
  title: string;
}

export interface IComCardProps {
  commentId: string;
  content: string;
  newsId: string;
  time: string;
  id: string
}