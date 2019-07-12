<template>
  <div class="callOnline">
    <div class="list">
      <div class="item" v-for="(item, index) in lists" :key="index">
        <div class="top">
          <div class="img">
            <img :src="item.num0" alt />
          </div>
          <div class="container">
            <div class="left item_commom">
              <span>{{ item.num }}</span>
              <span class="item2">{{ item.num3 }}</span>
            </div>
            <div class="right item_commom1">
              <div class="more1">
                <span>{{ item.num2 }}</span>
                <span class="item2 ansower">回复</span>
              </div>
              <img class="more2" src="img/turn_right.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import Tab from "vux/src/components/tab";
// import TabItem from "vux/src/components/tab/tab-item";
// import { Tab, TabItem } from "vux";
// import { XButton } from "vux";

export default {
  components: {
    // Tab,
    // TabItem,
    // XButton
  },
  data: function() {
    return {
      lists: [
        {
          num0: "./img/call.png",
          num: "苏大强",
          num2: "下午 09：33",
          num3: "最后一条消息记录"
        },
        {
          num0: "./img/call.png",
          num: "苏大强",
          num2: "下午 09：33",
          num3: "最后一条消息记录"
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

<style lang="scss" scoped="">
@import "@/assets/scss/base.scss"; /*引入配置*/
.callOnline {
  background: $background-color-theme;
  height: 100%;
  padding: 18px 14px 0 14px;
  .list {
    background: $background-color-theme;
    .item {
      //   margin: 15px;
      border-radius: 5px;
      padding: 42px 30px 38px 22px;
      margin-bottom: 9px;
      background: $background-color-theme;
      .top {
        display: flex;
        align-items: center;
        .img {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 26px;
          height: 27px;
          background: $background-color-theme;

          margin-right: 16px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .container {
          font-size: 32px;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: $font-color-themesec;
          display: flex;
          justify-content: space-between;
          width: 100%;
          .item_commom1 {
            flex-direction: row;
            display: flex;
            align-items: center;
            .more1 {
              flex-direction: column;
              display: flex;
            }
            .more2 {
              width: 42px;
              height: 42px;
              margin-left: 12px;
            }
          }
          .item_commom {
            display: flex;
            flex-direction: column;

            .item2 {
              margin-top: 20px;
            }
            .ansower {
              color: #999999;
              text-align: right;
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
          background: $background-color-theme1;
          border-radius: 6px;
        }
        .commite2 {
          width: 133px;
          line-height: 44px;
          height: 44px;
          background: $background-color-theme1;
          border-radius: 6px;
          margin-left: 28px;
        }
      }
    }
  }
}
</style>
