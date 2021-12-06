import React from 'react';

export interface IHeaderProps {
  toFlash?: Function;
}

export interface INewTabProps extends IHeaderProps {
}

export interface ITabsPaneProps extends IHeaderProps {
  id?: number | string;
  name?: string;
}[]
export interface IPubAvatarProps {
  login?: boolean;
  avatarUrl?: string;
}


export interface IResponceResult {
  data?: any;
}