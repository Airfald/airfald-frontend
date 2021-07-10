import { lazy } from 'react'

const routesName = {
  login: 'login',
  notFound: 'notFound'
}

const routesPath = {
  login: '/login',
  notFound: '/notFound'
}

const routes = [
  {
    path: routesPath.login,
    name: routesName.login,
    component: lazy(() => import(/* webpackChunkName: 'login'*/ '@src/views/Login'))
  },
  {
    path: routesPath.notFound,
    name: routesName.notFound,
    component: lazy(() => import(/* webpackChunkName: 'login'*/ '@src/views/NotFound'))
  }
]

export default { routesName, routes }
