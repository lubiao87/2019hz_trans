import Vue from "vue";
import Router from "vue-router";
import Home from "./views/home/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      meta: {
        keepAlive: true // 缓存
      },
      component: () =>
        import(/* webpackChunkName: "about" */ "@/views/test/About.vue")
    },
    {
      path: "/mapArea",
      name: "mapArea",
      meta: {
        keepAlive: true // 缓存
      },
      component: () => import("@/views/olmap/mapArea.vue")
    },
    {
      path: "/chatOnline",
      name: "chatOnline",
      meta: {
        keepAlive: true // 缓存
      },
      component: () => import("@/views/chat-online/chat_online.vue")
    }
  ]
});
