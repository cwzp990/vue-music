import axios from "axios";

let instance = axios.create();

instance.defaults.withCredentials = true

instance.interceptors.request.use((config) => {
  return config;
});

instance.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  (err) => {
    if (err.message === 'Request failed with status code 301') {
      window.location.href = '/#/login'
    }
  }
);

export default instance;
