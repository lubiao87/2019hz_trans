<template>
  <div class="onlineList">
    <div class="list">
      <div
        class="item"
        v-for="(item, index) in lists"
        :key="index"
        @click="lookDetails(item)"
      >
        <div class="top">
          <div class="img">
            <img :src="item.num0" alt />
            <badge></badge>
          </div>
          <div class="container">
            <div class="left item_commom">
              <span>{{ item.num }}</span>
              <span class="item2">{{ item.num3 }}</span>
            </div>
            <div class="right item_commom">
              <span>{{ item.num2 }}</span>
              <span class="item2 ansower">回复</span>
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
import { Badge } from "vux";

export default {
  components: {
    Badge
  },
  data: function() {
    return {
      lists: [
        {
          num0: "./img/kehu-1.png",
          num: "苏大强",
          num2: "下午 09：33",
          num3: "最后一条消息记录"
        },
        {
          num0: "./img/kehu-1.png",
          num: "苏强",
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
  methods: {
    lookDetails(item) {
      console.log(item);
      // this.$router.push({ name: "enclosurePage", params: { data: null } });
      this.$router.push({
        name: "enclosurePage",
        params: {
          data: { id: 23 }
        }
      });
    }
  }
};
</script>

<!--Add"scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="">
@import "@/assets/scss/base.scss"; /*引入配置*/
</style>
<style lang="scss">
@import "@/assets/scss/base.scss"; /*引入配置*/
.onlineList {
  background: rgba(239, 239, 244, 1);
  height: 100%;
  padding: 18px 14px 0 14px;
  .vux-tab {
    background: rgba(239, 239, 244, 1) !important;
  }
  .vux-tab-wrap {
    background: rgba(239, 239, 244, 1);
  }
  .list {
    background: rgba(239, 239, 244, 1);
    .item {
      //   margin: 15px;
      border-radius: 5px;
      padding: 42px 30px 38px 22px;
      margin-bottom: 9px;
      background: #fff;
      .top {
        display: flex;
        .img {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          width: 80px;
          height: 80px;
          background: rgba(255, 255, 255, 1);

          margin-right: 20px;
          img {
            width: 100%;
            // height: 100%;
          }
        }
        .container {
          font-size: 32px;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(0, 0, 0, 1);
          display: flex;
          justify-content: space-between;
          width: 100%;
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
