import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/login/index.vue";
import Layout from "../components/layout/index.vue";

Vue.use(VueRouter);

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
        component: () =>
          import(
            /* webpackChunkName: "Songlist" */ "../views/songlist/index.vue"
          )
      },
      {
        path: "/singer",
        name: "Singer",
        component: () =>
          import(/* webpackChunkName: "Singer" */ "../views/singer/index.vue")
      },
      {
        path: "/rank",
        name: "Rank",
        component: () =>
          import(/* webpackChunkName: "Rank" */ "../views/rank/index.vue")
      },
      {
        path: "/mine",
        name: "Mine",
        component: () =>
          import(/* webpackChunkName: "Mine" */ "../views/mine/index.vue")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
