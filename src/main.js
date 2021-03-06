import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store"; //引入store
import "lib-flexible";
import "@/config/rem"; // 配置flex
import "normalize.css"; // 重置样式表
import "@/assets/scss/index.scss"; // 全局样式
// import "./axios";

import infiniteScroll from "vue-infinite-scroll";
Vue.use(infiniteScroll);

Vue.prototype.GLOBAL = "ws://192.168.12.118:8099/transApp/chat/";
// Vue.prototype.IMGURL = "ws://192.168.12.71:50087/chatlineDev/chat/";
// const FastClick = require("fastclick");
// FastClick.attach(document.body);
import { LoadingPlugin, AlertPlugin, ToastPlugin } from "vux";
Vue.use(LoadingPlugin);
Vue.use(AlertPlugin);
Vue.use(ToastPlugin);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
