import Home from './containers/Home/Home'
import Hi from './containers/Hi/Hi'
import NotFound from './containers/NotFound/NotFound'

function getSomeData() {
  return "hey"
}

export const routes = [
  { exact: true,
    path: '/',
    component: Home,
    loadData: () => getSomeData(),
  },
  {
    path: '/hi',
    component: Hi,
    loadData: () => getSomeData(),
  },
  {
    component: NotFound,
    loadData: () => getSomeData(),
  }

  // etc.
]
