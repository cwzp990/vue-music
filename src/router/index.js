import Vue from 'vue'
import Router from 'vue-router'

const login = () => import('pages/login/login')
const layout = () => import('pages/layout/layout')
const home = () => import('pages/home/home')
const account = () => import('pages/account/account')

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/login'},
    {path: '/login', component: login},
    {
      path: '/layout',
      component: layout,
      children: [
        {path: '/', redirect: '/home'},
        {path: '/home', component: home},
        {path: '/account', component: account}
      ]
    }
  ]
})
