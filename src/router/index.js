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
const search = () => import('components/search/search')
const singer = () => import('components/singer/singer')
const singerDetails = () => import('components/singer/children/singer-details')
const singerHot = () => import('components/singer/children/children/singer-hot')
const singerAlbum = () => import('components/singer/children/children/singer-album')
const singerVideo = () => import('components/singer/children/children/singer-video')
const singerInfo = () => import('components/singer/children/children/singer-info')
const songList = () => import('components/song-list/song-list')
const songListDetails = () => import('components/song-list/children/songlist-details')

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
        {path: '/social', component: social},
        {
          path: '/singer',
          component: singer,
          children: [
            {
              path: '/singer/:id/details',
              component: singerDetails,
              children: [
                {path: '/singer/:id/details/hot', component: singerHot},
                {path: '/singer/:id/details/album', component: singerAlbum},
                {path: '/singer/:id/details/video', component: singerVideo},
                {path: '/singer/:id/details/info', component: singerInfo}
              ]
            }
          ]
        }
      ]
    },
    {path: '/search', component: search},
    {
      path: '/songList/:id',
      component: songList,
      children: [
        {path: '/songList/:id/details', components: songListDetails}
      ]
    }
  ]
})
