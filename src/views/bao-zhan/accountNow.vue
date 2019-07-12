<template>
  <div class="accountNow">
    <tab :line-width="0" custom-bar-width="60px">
      <tab-item
        active-class="active-2"
        @on-item-click="onTabClick('mapArea')"
        selected
        >处理中</tab-item
      >
      <tab-item active-class="active-2" @on-item-click="onTabClick('accSearch')"
        >待评价</tab-item
      >
      <tab-item
        active-class="active-2"
        @on-item-click="onTabClick('accountNow')"
        >已完成</tab-item
      >
      <tab-item
        active-class="active-2"
        @on-item-click="onTabClick('otherSearch')"
        >转投诉</tab-item
      >
    </tab>
    <div class="list">
      <div class="item" v-for="(item, index) in lists" :key="index">
        <div class="top">
          <div class="img">
            <img :src="item.num0" alt />
          </div>
          <div class="container">
            <p>
              服务单号
              <span>{{ item.num }}</span>
            </p>
            <p>
              产品账号
              <span>{{ item.num }}</span>
            </p>
            <p>
              受理时间
              <span>{{ item.num }}</span>
            </p>
            <p>
              装机地址
              <span>{{ item.num }}</span>
            </p>
          </div>
        </div>
        <div class="bottom">
          <x-button class="commite1">催单</x-button>
          <x-button class="commite2">转投诉</x-button>
        </div>
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
          num4: "广东省广州市天河区***佳都商务大厦西塔801"
        },
        {
          num0: "./img/icon.png",
          num: "PingFang-SC-Medium",
          num2: "ADSL 7758234",
          num3: "2019/6/12 11:30:30",
          num4: "广东省广州市天河区***佳都商务大厦西塔801"
        }
      ]
    };
  },
  created() {},
  mounted() {
    // this.alertShow();
  },
  methods: {}
};
</script>

<!--Add"scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="">
@import "@/assets/scss/base.scss"; /*引入配置*/

.accountNow {
  .active-2 {
    padding-bottom: 2px;
    border-bottom: 2px solid #4487f6 !important;

    color: #4487f6 !important;
  }
}
</style>
<style lang="scss">
@import "@/assets/scss/base.scss"; /*引入配置*/
.accountNow {
  background: rgba(239, 239, 244, 1);
  height: 100%;
  .vux-tab {
    background: rgba(239, 239, 244, 1) !important;
  }
  .vux-tab-wrap {
    background: rgba(239, 239, 244, 1);
  }
  .list {
    background: rgba(239, 239, 244, 1);
    .item {
      margin: 15px;
      border-radius: 5px;
      padding: 39px 41px 33px 22px;
      background: #fff;
      .top {
        display: flex;
        .img {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 94px;
          height: 94px;
          background: rgba(255, 255, 255, 1);
          border: 2px solid rgba(224, 221, 216, 1);
          border-radius: 5px;
          margin-right: 16px;
          img {
            width: 62px;
            height: 49px;
          }
        }
        .container {
          p {
            font-size: 26px;
            color: rgba(153, 153, 153, 1);
            margin-bottom: 20px;
            span {
              margin-left: 23px;
              color: #000;
            }
          }
        }
      }
      .bottom {
        margin-top: 21px;
        color: #fff;
        font-size: 26px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .commite1 {
          width: 100px;
          height: 44px;
          line-height: 44px;
          background: rgba(68, 135, 246, 1);
          border-radius: 6px;
        }
        .commite2 {
          width: 133px;
          line-height: 44px;
          height: 44px;
          background: rgba(68, 135, 246, 1);
          border-radius: 6px;
          margin-left: 28px;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.accountNow {
  .weui-btn_default {
    color: #fff;
    background-color: #f8f8f8;
  }
  .weui-btn + .weui-btn {
    margin-top: 0;
  }
  .weui-btn {
    margin-left: 0;
    margin-right: 0;
  }
  .vux-tab {
    background: rgba(239, 239, 244, 1) !important;
    padding: 26px 44px 15px 60px;
  }
  .vux-tab .vux-tab-item {
    width: 89px !important;
    height: 44px !important;
    line-height: 44px !important;
  }
  .vux-tab-container {
    background: rgba(239, 239, 244, 1);
  }
}
</style>
