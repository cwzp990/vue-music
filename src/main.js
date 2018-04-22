import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import './style/reset.scss'
import './utils/rem'
import './icons'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
