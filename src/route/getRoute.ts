
import { IpagesRoutes } from './types'
import { is, injectUnmount } from '@/Utils'

class RouteMethod {
  requirePage() {
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
        lastRoute = { url, component, exact: false }
        continue;
      }
      pagesRoutes.push({
        url,
        exact: true,
        component
      })
    }
    pagesRoutes.push(lastRoute);
    return pagesRoutes;
  }
}


export const routeMethod = new RouteMethod();