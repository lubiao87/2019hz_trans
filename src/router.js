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
    },
    // 我要找工程师
    {
      path: "/lookEngineer",
      name: "lookEngineer",
      meta: {
        keepAlive: true // 缓存
      },
      component: () => import("@/views/look-engineer/look_engineer.vue")
    },
    // 区域查找
    {
      path: "/lookEngineer/mapArea",
      name: "mapArea",
      meta: {
        keepAlive: true // 缓存
      },
      component: () => import("@/views/look-engineer/mapArea.vue")
    },
    // 绑定账号查找
    {
      path: "/lookEngineer/accSearch",
      name: "ACCSearch",
      meta: {
        keepAlive: true // 缓存
      },
      component: () => import("@/views/look-engineer/ACCSearch.vue")
    }
  ]
});
