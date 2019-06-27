import Vue from "vue";
import Router from "vue-router";
import Home from "./views/home/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    // 测试
    {
      path: "/about",
      name: "about",
      meta: {
        keepAlive: true // 缓存
      },
      component: () =>
        import(/* webpackChunkName: "about" */ "@/views/test/About.vue")
    },
    /* 首页 */
    {
      path: "/",
      name: "index",
      redirect: "/home"
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      meta: {
        keepAlive: true // 缓存
      }
    },
    {
      path: "/txfwapp",
      name: "mapArea",
      meta: {
        keepAlive: true // 缓存
      },
      component: () => import("@/views/olmap/mapArea.vue")
    },
    {
      // 在线聊天
      path: "/chatOnline",
      name: "chatOnline",
      meta: {
        keepAlive: true // 缓存
      },
      component: () => import("@/views/chat-online/chat_online.vue")
    },
    {
      // 评价
      path: "/appraiseSheet",
      name: "appraiseSheet",
      meta: {
        keepAlive: true // 缓存
      },
      component: () => import("@/views/appraise-sheet/appraise_sheet.vue")
    },
    // 服务单
    {
      path: "/generatingOrders",
      name: "generatingOrders",
      meta: {
        keepAlive: true // 缓存
      },
      component: () => import("@/views/generating-orders/generating_orders.vue")
    }
  ]
});
