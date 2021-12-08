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
  toRefresh: Function;
}
