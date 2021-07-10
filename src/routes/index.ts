/*
 * @Author: ouhefu
 * @Date: 2020-11-11 15:38:57
 * @LastEditors: ouhefu
 * @LastEditTime: 2020-04-08 18:35:22
 * @Description:
 * routesName => 所有的路由名称对象
 * routes => 数组
 */

import demo from './demo'
import others from './others'

const routes = [
  ...demo.routes,
  ...others.routes
]

const routeNames = {
  ...demo.routesName,
  ...others.routesName
}

const getRouteByName = (name: string) => {
  const curRoute = routes.find(item => item.name === name)
  if (!curRoute) {
    console.error(`未找到命名为${name}的路由`)
    return
  }

  return curRoute
}

const getRoutePathByName = (name: string) => {
  const route = getRouteByName(name)
  return route ? route.path : ''
}

export { getRouteByName, getRoutePathByName, routeNames }

export default routes
