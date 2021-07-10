import { lazy } from 'react'

const routesName = {
  demo: 'demo',
  demo1: 'demo1'
}

const routesPath = {
  demo: '/demo',
  demo1: '/demo1'
}

const routes = [
  {
    path: routesPath.demo,
    name: routesName.demo,
    component: lazy(() => import(/* webpackChunkName: 'demo'*/ '@src/views/demo'))
  },
  // {
  //   path: '/demo1',
  //   name: routesName.demo1,
  //   component: lazy(() => import(/* webpackChunkName: 'demo'*/ '@src/views/demo/SearchForm'))
  // }
]

export default { routesName, routesPath, routes }
