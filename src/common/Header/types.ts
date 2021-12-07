import React from 'react';

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
export interface IResponceResult {
  data?: any;
}


export interface IUserContentProps extends IPubAvatarProps {
}