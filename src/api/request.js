import axios from "axios";
import toast from '../components/toast'

let instance = axios.create();

instance.defaults.withCredentials = true;

instance.interceptors.request.use(config => {
  return config;
});

instance.interceptors.response.use(
  response => {
    console.log(response.data);
    return response;
  },
  err => {
    if (err.message === "Request failed with status code 301") {
      toast('请先登录～')
      window.location.href = "/#/login";
    }
  }
);

export default instance;
