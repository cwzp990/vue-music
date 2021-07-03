import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/login/index.vue";
import Layout from "../components/layout/index.vue";
const songlist = () => import(/* webpackChunkName: "Songlist" */ "../views/songlist/index.vue")
const query = () => import(/* webpackChunkName: "Query" */ "../views/search/index.vue")
const rank = () => import(/* webpackChunkName: "Rank" */ "../views/rank/index.vue")
const mine = () => import(/* webpackChunkName: "Mine" */ "../views/mine/index.vue")
const singer = () => import(/* webpackChunkName: "Singer" */ "../components/singer/index.vue")
const comments = () => import(/* webpackChunkName: "Comments" */ "../components/comment/index.vue")
const songlist_details = () => import(/* webpackChunkName: "Songlist_details" */ "../components/songlist_details/index.vue")

const routes = [
  {
    path: "/layout",
    component: Layout,
    children: [
      {
        path: "/",
        name: "Login",
        component: Login
      },
      {
        path: "/songlist",
        name: "Songlist",
        component: songlist
      },
      {
        path: "/list_detail",
        name: "Songlist_details",
        component: songlist_details
      },
      {
        path: "/query",
        name: "Query",
        component: query
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
      },
      {
        path: '/singer',
        name: "Singer",
        component: singer
      },
      {
        path: '/comments',
        name: "Comments",
        component: comments
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
