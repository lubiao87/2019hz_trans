<template>
  <div class="installtion-ngineer">
    <!-- <b-head :showBack="true" :title="title" @click="setMyTime"></b-head> -->
    <div class="base-box">
      <div class="base-container flex flex-middle">
        <span class="head-back" @click="goBack">
          <span class="iconfont">&#xe616;</span>
        </span>
        <span class="head-title table-cell">在岗</span>
        <span class="head-slot"></span>
      </div>
    </div>
    <div class="content">
      <tab :line-width="0">
        <tab-item
          active-class="active-1"
          @on-item-click="onTabClick('onlineList')"
          :selected="this.viewsName == 'onlineList' ? true : false"
          >在线聊天</tab-item
        >
        <tab-item
          active-class="active-1"
          @on-item-click="onTabClick('callOnline')"
          :selected="this.viewsName == 'callOnline' ? true : false"
          >一键呼叫</tab-item
        >
        <tab-item
          active-class="active-1"
          @on-item-click="onTabClick('accountNow')"
          :selected="this.viewsName == 'accountNow' ? true : false"
          >一键报障</tab-item
        >
        <tab-item
          active-class="active-1"
          @on-item-click="onTabClick('serviceList')"
          :selected="this.viewsName == 'serviceList' ? true : false"
          >我的服务单</tab-item
        >
      </tab>
      <div class="router-box">
        <component v-bind:is="viewsName" :key="viewsName"></component>
      </div>
      <img
        src="../../assets/images/set-wooks.png"
        class="set-wooks"
        alt="设置工作状态"
        @click="setMyTime"
      />
    </div>
  </div>
</template>
<script>
// import Tab from "vux/src/components/tab";
// import TabItem from "vux/src/components/tab/tab-item";
import { Tab, TabItem } from "vux";
import BHead from "@/components/base/B-Head";
import accountNow from "@/views/installtion-ngineer/accountNow.vue";
import onlineList from "@/views/installtion-ngineer/onlineList.vue";
import callOnline from "@/views/installtion-ngineer/callOnline.vue";
import serviceList from "@/views/installtion-ngineer/serviceList.vue";
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
      title: "我的记录(在岗)",
      viewsName: ""
    };
  },
  created() {
    console.log(this.$route.params.tabName);
    this.viewsName = this.$route.params.tabName || "onlineList";
  },
  mounted() {
    // this.alertShow();
  },
  methods: {
    onTabClick(link) {
      this.viewsName = link;
    },
    setMyTime() {
      console.log("setMyTime");
      this.$router.push({ name: "wookTime", params: { data: null } });
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<!--Add"scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "@/assets/scss/base.scss"; /*引入配置*/
.installtion-ngineer {
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
    width: 100%;
    height: 100px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
    border-bottom: 1px solid $border-color-theme;
    background-color: $background-color-theme;
    .base-container {
      position: relative;
      height: 100%;
      .head-back {
        position: absolute;
        left: 30px;
        display: inline-block;
        width: 40px;
        height: 100%;
        line-height: 28px;
        font-size: 28px;
        // top: 20px;
        color: $font-color-theme;
        // background: url("../../assets/images/return.png") no-repeat center;
        background-size: 100%;
        background-position: center;
        // overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .head-title {
        font-size: $font_medium_s;
        font-weight: bold;
        color: $font-color-themesec;
      }
      .head-slot {
        position: absolute;
        right: 30px;
      }
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
    .accountNow {
      .vux-tab {
        background-color: #efeff4 !important;
      }
    }
  }
  .set-wooks {
    position: absolute;
    right: 40px;
    bottom: 40px;
    width: 104px;
    height: 104px;
  }
}
</style>
<style lang="scss">
.installtion-ngineer {
  @import "@/assets/scss/base.scss"; /*引入配置*/
  font-size: $font_little;
  .base-box {
    border-bottom: 0.01333rem solid #fff;
    position: relative;
    .head-title {
      position: relative;
    }
    // .head-title::after {
    //   content: "﹀";
    //   display: inline-block;
    //   position: absolute;
    //   top: 8px;
    //   color: $font-color-theme;
    //   right: -60px;
    // }
  }
  .vux-tab-wrap {
    height: 102px;
    padding-top: 0;
  }
}
</style>
