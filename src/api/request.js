import axios from "axios";
import toast from '../components/toast'

let instance = axios.create();

instance.defaults.withCredentials = true;

instance.interceptors.request.use(config => {
  return config;
});

instance.interceptors.response.use(
  response => {
    return response;
  },
  err => {
    toast(err.message)
  }
);

export default instance;
