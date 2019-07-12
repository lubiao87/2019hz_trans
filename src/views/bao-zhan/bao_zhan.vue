<template>
  <div class="bao-zhan">
    <b-head :showBack="true" :title="title"></b-head>
    <div class="content">
      <tab :line-width="0">
        <tab-item
          active-class="active-1"
          @on-item-click="onTabClick('onlineList')"
          selected
          >在线聊天</tab-item
        >
        <tab-item
          active-class="active-1"
          @on-item-click="onTabClick('callOnline')"
          >一键呼叫</tab-item
        >
        <tab-item
          active-class="active-1"
          @on-item-click="onTabClick('accountNow')"
          >一键报障</tab-item
        >
        <tab-item
          active-class="active-1"
          @on-item-click="onTabClick('serviceList')"
          >我的服务单</tab-item
        >
      </tab>
      <div class="router-box">
        <component v-bind:is="viewsName" :key="viewsName"></component>
      </div>
    </div>
  </div>
</template>
<script>
// import Tab from "vux/src/components/tab";
// import TabItem from "vux/src/components/tab/tab-item";
import { Tab, TabItem } from "vux";
import BHead from "@/components/base/B-Head";
import accountNow from "@/views/bao-zhan/accountNow.vue";
import onlineList from "@/views/bao-zhan/onlineList.vue";
import callOnline from "@/views/bao-zhan/callOnline.vue";
import serviceList from "@/views/bao-zhan/serviceList.vue";
export default {
  components: {
    BHead,
    Tab,
    TabItem,
    accountNow,
    onlineList,
    callOnline,
    serviceList
    // Grid
  },
  data: function() {
    return {
      title: "我的报障记录",
      viewsName: "onlineList"
    };
  },
  created() {},
  mounted() {
    // this.alertShow();
  },
  methods: {
    onTabClick(link) {
      this.viewsName = link;
    }
  }
};
</script>

<!--Add"scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "@/assets/scss/base.scss"; /*引入配置*/
.bao-zhan {
  .router-box {
    height: 100%;
  }
  .vux-tab-container {
    height: 100% !important;
  }
  .vux-tab {
    height: 102px !important;
    padding: 15px 44px 26px 60px;
  }
  .vux-tab .vux-tab-item {
    width: 153px !important;
    height: 61px !important;
    line-height: 61px !important;
  }
  .base-box {
    position: relative;

    .head-title {
      color: #000 !important;
    }
  }
  .content {
    height: 100%;
    .active-1 {
      width: 153px;
      height: 61px;
      line-height: 61px;
      background: rgba(68, 135, 246, 1);
      border-radius: 30px;
      color: #fff !important;
    }
  }
}
</style>
<style lang="scss">
.bao-zhan {
  @import "@/assets/scss/base.scss"; /*引入配置*/
  font-size: $font_little;
  .base-box {
    border-bottom: 0.01333rem solid #fff;
  }
  .vux-tab-wrap {
    height: 102px;
    padding-top: 0;
  }
}
</style>
