
export interface IHeaderProps {
  toFlash?: Function;
  flash?: boolean;
}

export interface INewTabProps extends IHeaderProps {
}

export interface ITabsPaneProps extends IHeaderProps {
  id?: number | string;
  name?: string;
}[]
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