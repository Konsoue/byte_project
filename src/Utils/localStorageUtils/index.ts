import {
  ILoginData
} from './types'

// localstorage的标识
const name = "LOGIN_DATA"

export default {
  // 获取登陆数据
  get: () => {
    let userData = localStorage.getItem(name) ? JSON.parse((localStorage.getItem(name) as string)) : null
    //如果localstorage中存在登陆信息且还未过期，则返回数据
    if (userData && (userData.expires > new Date().valueOf())) {
      return userData
    } else {
      // 若过期则移除localstorage
      localStorage.removeItem(name)
    }
    // 没数据或者已过期则返回的是空对象
    return {}
  },
  /**
   * 设置登陆数据进localstorage
   * params values: 登陆返回的数据
   */
  set: (values: ILoginData) => {
    values.expires = values.expireAt
    localStorage.setItem(name, JSON.stringify(values))
  },
  unset: () => {
    localStorage.removeItem(name)
  }
}