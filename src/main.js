import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store"; //引入store
import "lib-flexible";
import "@/config/rem"; // 配置flex
import "normalize.css"; // 重置样式表
import "@/assets/scss/index.scss"; // 全局样式
import infiniteScroll from "vue-infinite-scroll";

Vue.use(infiniteScroll);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
