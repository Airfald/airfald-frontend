import { lazy } from 'react'

const routesName = {
  login: 'login',
  home: 'home',
  notFound: 'notFound'
}

const routesPath = {
  login: '/login',
  home: '/home',
  notFound: '/notFound'
}

const routes = [
  {
    path: routesPath.login,
    name: routesName.login,
    component: lazy(() => import(/* webpackChunkName: 'login'*/ '@src/views/Login'))
  },
  {
    path: routesPath.home,
    name: routesName.home,
    component: lazy(() => import(/* webpackChunkName: 'login'*/ '@src/views/Home'))
  },
  {
    path: routesPath.notFound,
    name: routesName.notFound,
    component: lazy(() => import(/* webpackChunkName: 'login'*/ '@src/views/NotFound'))
  }
]

export default { routesName, routesPath, routes }
