<template>
  <div class="look-engineer">
    <b-head :showBack="true" :title="title"></b-head>
    <div class="content">
      <tab :line-width="0" custom-bar-width="60px">
        <tab-item
          active-class="active-1"
          @on-item-click="onTabClick('mapArea')"
          selected
          >区域查</tab-item
        >
        <tab-item
          active-class="active-1"
          @on-item-click="onTabClick('accSearch')"
          >绑定账号查</tab-item
        >
        <tab-item active-class="active-1" @on-item-click="onTabClick('')"
          >其他方式查</tab-item
        >
      </tab>
      <!-- <div class="gray-bg"></div> -->
      <div class="router-box">
        <component v-bind:is="viewsName" :key="viewsName"></component>
      </div>
    </div>
  </div>
</template>
<script>
import { Tab, TabItem } from "vux";
import BHead from "@/components/base/B-Head";
import mapArea from "@/views/look-engineer/mapArea.vue";
import accSearch from "@/views/look-engineer/ACCSearch.vue";
export default {
  components: {
    BHead,
    Tab,
    TabItem,
    mapArea,
    accSearch
    // Grid
  },
  data: function() {
    return {
      title: "我要找工程师",
      viewsName: "mapArea"
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
<style lang="scss" scoped="">
@import "@/assets/scss/base.scss"; /*引入配置*/
.look-engineer {
  .base-box {
    position: relative;
  }
  .content {
    .active-1 {
      color: $font-color-shallow3;
    }
    .router-box {
      background-color: $background-color-themesec;
      width: 100%;
      padding: 30px;
      // height: 740px;
    }
  }
}
</style>
<style lang="scss">
@import "@/assets/scss/base.scss"; /*引入配置*/
.look-engineer {
  .vux-tab-container {
    height: 100%;
    .vux-tab {
      height: 48px;
      overflow: hidden;
      .vux-tab-item {
        height: 50px;
      }
    }
  }
  .vux-tab-item {
    position: relative;
  }
  .vux-tab-item::after {
    position: absolute;
    right: 0;
    top: 19%;
    content: "";
    height: 60%;
    width: 0;
    display: block;
    border: none !important;
    border-right: 0.5px solid $border-color-theme !important;
  }
  .vux-tab-item::after:nth-child(3) {
    border-right: none !important;
  }
  .base-box {
    border-bottom: none;
  }
}
body .vux-tab .vux-tab-item {
  color: #6e7280;
  font-size: 28px;
}
</style>
