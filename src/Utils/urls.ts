import {
  IUserUrl,
  INewsUrl,
  ICollectionUrl,
  ICommentUrl,
  ILikeUrl
} from './types'
import localStorageUtils from "@/Utils/localStorageUtils";


export const userUrl: IUserUrl = {
  login: '/api/user/login',
  create: '/api/user/create',
  updateAvatar: '/api/user/updateAvatar',
  updatePassword: '/api/user/updatePassword',
}


export const newsUrl: INewsUrl = {
  addItem: '/api/news/addItem',
  getMyNewsDigest: '/api/news/getNewsDigest',
  getNewsItem: '/api/news/getNewsItem',
  getNewsType: '/api/news/getNewsType',
  visitorGetNewsDigest: '/api/news/visitorGetNewsDigest',
  get getNewsDigest() {
    const userData = localStorageUtils.get();
    return userData.token ? this.getMyNewsDigest : this.visitorGetNewsDigest;
  }
}


export const collectionUrl: ICollectionUrl = {
  add: '/api/collection/add',
  delete: '/api/collection/delete',
  getMyCollections: '/api/collection/getMyCollections',
}

export const commentUrl: ICommentUrl = {
  add: '/api/comment/add',
  delete: '/api/comment/delete',
  getMyComments: '/api/comment/getMyComments',
  getComments: '/api/comment/getComments',
}

export const likeUrl: ILikeUrl = {
  add: '/api/like/add',
  delete: '/api/like/delete',
  getMyLikes: '/api/like/getMyLikes',
}