import Demo from '@src/views/demo'
import SearchForm from '@src/views/demo/SearchForm'

const routesName = {
  demo: 'demo',
  demo1: 'demo1'
}

const routes = [
  {
    path: '/demo',
    name: routesName.demo,
    component: Demo
  },
  {
    path: '/demo1',
    name: routesName.demo1,
    component: SearchForm
  }
]

export default { routesName, routes }
