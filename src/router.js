import Vue from "vue";
import Router from "vue-router";

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
      redirect: "home"
    },
    {
      path: "/home",
      name: "home",
      component: () => import("@/views/home/Home.vue"),
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
    },
    // 工程师名片
    {
      path: "/businessCard",
      name: "businessCard",
      meta: {
        keepAlive: true // 缓存
      },
      component: () => import("@/views/business-card/business_card.vue")
    },
    // 区域搜索
    {
      path: "/areaSearch",
      name: "areaSearch",
      meta: {
        keepAlive: true // 缓存
      },
      component: () => import("@/views/map-search/area_search.vue")
    },
    // w我的报账记录
    {
      path: "/baoZhan",
      name: "baoZhan",
      meta: {
        keepAlive: true // 缓存
      },
      component: () => import("@/views/bao-zhan/bao_zhan.vue")
    },
    // 一键报障
    {
      path: "/quickReport",
      name: "quickReport",
      meta: {
        keepAlive: true // 缓存
      },
      component: () => import("@/views/quick-report/quick_report.vue")
    },
    // 工程师其它查询结束
    {
      path: "/searchResult",
      name: "searchResult",
      meta: {
        keepAlive: true // 缓存
      },
      component: () => import("@/views/search-result/search_result.vue")
    },
    // 投诉建议单
    {
      path: "/complaintSlip",
      name: "complaintSlip",
      meta: {
        keepAlive: true // 缓存
      },
      component: () => import("@/views/complaint-slip/complaint_slip.vue")
    },
    // 聊天记录
    {
      path: "/enclosurePage",
      name: "enclosurePage",
      meta: {
        keepAlive: true // 缓存
      },
      component: () => import("@/views/enclosure-page/enclosure_page.vue")
    },
    // 投诉记录
    {
      path: "/touSu",
      name: "touSu",
      meta: {
        keepAlive: true // 缓存
      },
      component: () => import("@/views/tou-su/tou_su.vue")
    }
  ]
});
