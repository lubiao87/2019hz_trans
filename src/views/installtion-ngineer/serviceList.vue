<template>
  <div class="accountNow">
    <tab :line-width="0" custom-bar-width="60px">
      <tab-item
        active-class="active-2"
        @on-item-click="onTabClick('处理中')"
        selected
        >处理中</tab-item
      >
      <tab-item active-class="active-2" @on-item-click="onTabClick('待评价')"
        >待评价</tab-item
      >
      <tab-item active-class="active-2" @on-item-click="onTabClick('已完成')"
        >已完成</tab-item
      >
      <tab-item active-class="active-2" @on-item-click="onTabClick('转投诉')"
        >转投诉</tab-item
      >
    </tab>
    <div class="list">
      <div class="item" v-for="(item, index) in lists" :key="index">
        <img class="has_call" src="img/has_call.png" />
        <div class="top">
          <div class="img">
            <img :src="item.num0" alt />
          </div>
          <div class="container">
            <div class="panel">
              <div class="title">服务单号</div>
              <span>{{ item.num }}</span>
            </div>
            <div class="panel">
              <div class="title">产品账号</div>
              <span>{{ item.num2 }}</span>
            </div>
            <div class="panel">
              <div class="title">受理时间</div>
              <span>{{ item.num3 }}</span>
            </div>
            <div class="panel">
              <div class="title">装机地址</div>
              <span>{{ item.num4 }}</span>
            </div>
          </div>
        </div>
        <!-- <div class="bottom">
          <x-button class="commite1">催单</x-button>
          <x-button class="commite2">转投诉</x-button>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
// import Tab from "vux/src/components/tab";
// import TabItem from "vux/src/components/tab/tab-item";
import { Tab, TabItem } from "vux";
import { XButton } from "vux";

export default {
  components: {
    Tab,
    TabItem,
    XButton
  },
  data: function() {
    return {
      lists: [
        {
          num0: "./img/icon.png",
          num: "F201906101234",
          num2: "ADSL 7758234",
          num3: "2019/6/12 11:28:30",
          num4: "广东省广州市天河区***佳都商务大厦 西塔801"
        },
        {
          num0: "./img/icon.png",
          num: "F201906105678",
          num2: "ADSL 7758234",
          num3: "2019/6/12 11:30:30",
          num4: "广东省广州市天河区***佳都商务大厦 西塔801"
        }
      ],
      tabName: "处理中"
    };
  },
  created() {},
  mounted() {
    // this.alertShow();
  },
  methods: {
    onTabClick(tab) {
      this.tabName = tab;
    }
  }
};
</script>

<!--Add"scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="">
@import "@/assets/scss/base.scss"; /*引入配置*/

.accountNow {
  .active-2 {
    padding-bottom: 2px;
    border-bottom: 1px solid $font-color-theme2 !important;
    color: $font-color-theme2 !important;
  }
}
</style>
<style lang="scss">
@import "@/assets/scss/base.scss"; /*引入配置*/
.accountNow {
  font-size: $font_little;
  background: $background-color-themesec;
  height: 100%;
  .vux-tab {
    background: $background-color-theme !important;
  }
  .vux-tab-wrap {
    background: $background-color-theme;
  }
  .list {
    .item {
      margin: 15px;
      border-radius: 5px;
      padding: 39px 41px 33px 22px;
      background: $background-color-theme;
      position: relative;
      .has_call {
        position: absolute;
        top: 32px;
        right: 37px;
        width: 101px;
        // height: 74px;
      }
      .top {
        display: flex;
        .img {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 94px;
          height: 94px;
          background: $background-color-theme;
          border: 2px solid $border-color-theme;
          border-radius: 5px;
          margin-right: 16px;
          img {
            width: 62px;
            height: 49px;
          }
        }
        .container {
          .panel {
            overflow: hidden;
            .title {
              font-size: $font_little;
              color: $font-color-theme;
              margin-bottom: 20px;
              width: 24%;
              float: left;
            }
            span {
              font-size: $font_little;
              // margin-left: 23px;
              color: #000;
              width: 76%;
              float: left;
              line-height: 38px;
            }
          }
        }
      }
      .bottom {
        margin-top: 21px;
        color: $background-color-theme;
        font-size: 26px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .commite1 {
          width: 100px;
          height: 44px;
          line-height: 44px;
          background: $font-color-theme2;
          border-radius: 6px;
        }
        .commite2 {
          width: 133px;
          line-height: 44px;
          height: 44px;
          background: $font-color-theme2;
          border-radius: 6px;
          margin-left: 28px;
        }
      }
    }
  }
}
</style>
