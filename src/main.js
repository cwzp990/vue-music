import { createApp } from "vue";
import FastClick from 'fastclick'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./styles/index.scss";

const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
FastClick.attach(document.body)
