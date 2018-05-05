import Vue from 'vue'
import Router from 'vue-router'

const login = () => import('pages/login/login')
const layout = () => import('pages/layout/layout')
const home = () => import('pages/home/home')
const homeMusic = () => import('pages/home/children/music')
const homeVideo = () => import('pages/home/children/video')
const homeRadio = () => import('pages/home/children/radio')
const account = () => import('pages/account/account')
const mine = () => import('pages/mine/mine')
const social = () => import('pages/social/social')
const songList = () => import('components/song-list/song-list')

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/layout'},
    {path: '/login', component: login},
    {
      path: '/layout',
      component: layout,
      children: [
        {path: '/', redirect: '/home'},
        {
          path: '/home',
          component: home,
          children: [
            {path: '/home', redirect: '/home/music'},
            {path: '/home/music', component: homeMusic},
            {path: '/home/video', component: homeVideo},
            {path: '/home/radio', component: homeRadio}
          ]
        },
        {path: '/account', component: account},
        {path: '/mine', component: mine},
        {path: '/social', component: social}
      ]
    },
    {path: '/songList/:id', component: songList}
  ]
})
