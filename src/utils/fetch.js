import axios from 'axios'
import qs from 'qs'

// axios拦截器
axios.interceptors.request.use(config => {
  return config
}, err => {
  return Promise.reject(err)
})

// axios响应器
axios.interceptors.response.use(res => {
  return res
}, err => {
  return Promise.reject(err)
})

export const postRequest = (url, params) => {
  return axios({
    methods: 'post',
    url: url,
    data: qs.stringify(params),
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    timeout: 3000
  })
}

export const getRequest = (url, params) => {
  return axios({
    methods: 'get',
    url: url,
    data: params,
    timeout: 3000
  })
}
