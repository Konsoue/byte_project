export interface IPubCommentProps {
  avatarUrl: string;
  detailId: string;
  data: {
    total: number;
    records: Array<{
      content: string;
      likesNum: number;
      time: string;
      _id: string;
      userName?: string;
      usetAvatar?: string;
      isMine?: boolean;
    }>;
  };
  collection: boolean;
  toRefresh: Function;
  collectionRefresh: () => void;
}

export interface IReplyCommentProps {
  avatarUrl: string;
  commentId: string;
  data: {
    total: number;
    records: Array<{
      content: string;
      likesNum: number;
      time: string;
      _id: string;
      userName?: string;
      userAvatar?: string;
      isMine?: boolean;
    }>;
  };
  state: string;
  toRefresh: Function;
}

export interface ICommentCardProps {
  data: {
    userName?: string;
    userAvatar?: string;
    content: string;
    time: string;
    likesNum: number;
    _id: string;
    isMine?: boolean;
  };
  avatarUrl: string;
}
