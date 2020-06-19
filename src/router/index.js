import Router from 'vue-router'
import Vue from 'vue'
import NewPage from '../components/NewPage'
// import Main from '../components/Main'
import Viewer from '../components/Viewer'
import Serp from '../components/Serp'

Vue.use(Router)

export const routes = [
  {
    path: '/',
    name: 'Main',
    component: NewPage,
    inNavBar: false
  },
  {
    path: '/new',
    name: 'New',
    component: NewPage,
    inNavBar: true
  },
  {
    path: '/viewer/:id',
    component: Viewer,
    name: 'Viewer',
    inNavBar: false
  },
  {
    path: '/search/:query',
    component: Serp,
    name: 'Serp',
    inNavBar: false
  }
]

export default new Router({
  mode: 'history',
  routes: routes
})
