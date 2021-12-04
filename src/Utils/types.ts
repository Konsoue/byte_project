export interface IUserUrl {
  login: string;
  create: string;
  updateAvatar: string;
  updatePassword: string;
  [attr: string]: string;
}

export interface INewsUrl {
  addItem: string;
  getNewsDigest: string;
  getNewsItem: string;
  [attr: string]: string;
}

export interface ICollectionUrl {
  add: string;
  delete: string;
  getMyCollections: string;
  [attr: string]: string;
}

export interface ICommentUrl {
  add: string;
  delete: string;
  getMyComments: string;
  getComments: string;
  [attr: string]: string;
}

export interface ILikeUrl {
  add: string;
  delete: string;
  getMyLikes: string;
  [attr: string]: string;
}