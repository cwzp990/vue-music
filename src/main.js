import 'babel-polyfill'
import Vue from 'vue'
import VueVideoPlayer from 'vue-video-player'
import { ToastPlugin } from 'vux'
import App from './App'
import router from './router'
import store from './store'
import './style/reset.scss'
import 'video.js/dist/video-js.css'
import './utils/rem'
import './icons'

Vue.use(ToastPlugin)
Vue.use(VueVideoPlayer)

const FastClick = require('fastclick')
FastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
