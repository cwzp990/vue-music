import axios from "axios";
import store from '../store'
import toast from '../components/toast'


let instance = axios.create();


instance.defaults.withCredentials = true;

instance.interceptors.request.use(config => {
  if (config.url !== '/search') {
    store.commit('SET_SHOW_MODAL', true)
  }
  return config;
});

instance.interceptors.response.use(
  response => {
    store.commit('SET_SHOW_MODAL', false)
    return response;
  },
  err => {
    store.commit('SET_SHOW_MODAL', false)
    toast(err.message)
  }
);

export default instance;
