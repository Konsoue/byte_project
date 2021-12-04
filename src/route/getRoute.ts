
import { IpagesRoutes } from './types'
import { is, injectUnmount } from '@/Utils'

class RouteMethod {
  isChild(path: string, url: string): boolean {
    let pLen = path.length, uLen = url.length;
    if (uLen === pLen && url === '/') return true;
    if (uLen < pLen) return false;
    if (!url.includes(path)) return false;
    let restUrl = url.replace(path, '');
    const reg = /^[a-zA-Z]+$/;
    if (restUrl[0] === '/') restUrl = restUrl.replace('/', '');
    return reg.test(restUrl);
  }
  /**
   * 获取对应 pages/path 路径下的 的 index.tsx
   * @param path
   * @returns
   */
  requirePage(path: string = '/'): IpagesRoutes[] {
    const pagesCtx = require.context('@/pages/', true, /index.tsx/);
    const pagesRoutes: IpagesRoutes[] = [];
    let lastRoute: IpagesRoutes = {};
    for (const key of pagesCtx.keys()) {
      // 获取 react 组件，若为 classComponent 则防止组件卸载后，异步 setState 出错
      let component = pagesCtx(key).default;
      if (!is.Function(component)) component = injectUnmount(component);
      // 修改路径
      let url = key.replace('/index.tsx', '').replace('.', '');
      if (url === '/home') url = '/';
      else if (url.includes('/home')) url = url.replace('/home', '');
      else if (url === '/notFound') {
        lastRoute = { url: '*', component, exact: false }
        continue;
      }
      // 处理 path 参数
      if (path[0] !== '/') path = '/' + path;
      if (this.isChild(path, url)) {
        pagesRoutes.push({
          url,
          exact: true,
          component
        })
      }
    }
    if (path === '/') pagesRoutes.push(lastRoute);
    return pagesRoutes;
  }
}


export const routeMethod = new RouteMethod();