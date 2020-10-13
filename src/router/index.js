import { createRouter, createWebHashHistory } from "vue-router";
import Login from "../views/login/index.vue";
import Layout from "../components/layout/index.vue";
const songList = () => import(/* webpackChunkName: "Songlist" */ "../views/songlist/index.vue")
const singer = () => import(/* webpackChunkName: "singer" */ "../views/singer/index.vue")
const rank = () => import(/* webpackChunkName: "rank" */ "../views/rank/index.vue")
const mine = () => import(/* webpackChunkName: "mine" */ "../views/mine/index.vue")
const songlist_details = () => import(/* webpackChunkName: "songlist_details" */ "../components/songlist_details/index.vue")

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/layout",
    component: Layout,
    children: [
      {
        path: "/songlist",
        name: "SongList",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: songList
      },
      {
        path: "/list_detail",
        name: "List_detail",
        component: songlist_details
      },
      {
        path: "/singer",
        name: "Singer",
        component: singer
      },
      {
        path: "/rank",
        name: "Rank",
        component: rank
      },
      {
        path: "/mine",
        name: "Mine",
        component: mine
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
