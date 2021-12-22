import {
  IUserUrl,
  INewsUrl,
  ICollectionUrl,
  ICommentUrl,
  ILikeUrl,
  ILogUrl,
  IWeatherUrl
} from './types'
import localStorageUtils from "@/Utils/localStorageUtils";


export const userUrl: IUserUrl = {
  login: '/api/user/login',
  create: '/api/user/create',
  updateAvatar: '/api/user/updateAvatar',
  updatePassword: '/api/user/updatePassword',
  sendCreateMail: '/api/user/sendCreateMail',
  resetPassword: '/api/user/resetPassword',
  sendForgotMail: '/api/user/sendForgotMail',
}


export const newsUrl: INewsUrl = {
  addItem: '/api/news/addItem',
  getMyNewsDigest: '/api/news/getNewsDigest',
  getNewsItem: '/api/news/getNewsItem',
  visitorGetNewsItem: '/api/news/visitorGetNewsItem',
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

export const logUrl: ILogUrl = {
  getMyLogs: '/api/log/getMyLogs'
}

// const weatherApi = '';

export const weatherUrl: IWeatherUrl = {
  guangzhou: '/weather_mini?city=广州',
}