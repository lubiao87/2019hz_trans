<template>
  <div class="acc-search-engineer">
    <div class="title">绑定账号查</div>
    <div class="stip">当前绑定账号</div>
    <div class="phone-box">
      <span class="iconfont">&#xe61b;</span>
      <div class="phone-number">189****4556</div>
      <div class="this-stip">手机号</div>
    </div>
    <div class="engineer-list">
      <div class="engineer" v-for="(item, index) in datas" :key="index + 'jse'">
        <div class="index vux-1px">{{ item.accDetail.accNum }}</div>
        <p class="text-1">{{ item.accDetail.addressDesc }}</p>
        <p class="text-2" @click="generatingOrders">
          业务号码
          <span class="businees-number">{{item.accDetail.contactPhone}}</span>
        </p>
        <div class="eg-box vux-1px-t">
          <div class="stip">所在区域服务工程师</div>
          <panel :list="item.enginner" type="1" @on-click-item="onevaSheetLook"></panel>
          <span class="iconfont iconfont-set">&#xe68b;</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { mapState, mapGetters, mapActions } from "vuex"; //先要引入
// import { Search, Panel } from "vux";
// import { listSearchMixin } from "../../mixin"; //混淆请求
// import { api2 } from "../../api/api"; //api配置请求的路径
// import qs from "qs";
import Panel from "vux/src/components/panel";
export default {
  props: {
    datas: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  components: {
    // Search,
    Panel
  },
  watch:{},
  // mixins: [listSearchMixin],
  data: function() {
    return {
      title: "绑定账号查",
      enginner:[],
      dataList: [
        {
          number: "01",
          address: "惠州市惠城区XXX小区16栋708",
          account: "ADSL454545XXXXXX",
          panelData: [
            {
              src: "./img/kehu-1.png",
              title: "李克虎",
              desc: "江北营销服务中心",
              id: 384
            }
          ]
        },
        {
          number: "02",
          address: "惠州市惠城区XXX小区16栋708",
          account: "ADSL454545XXXXXX",
          panelData: [
            {
              src: "./img/kehu-1.png",
              title: "张科",
              desc: "江北营销服务中心",
              id: 382
            }
          ]
        }
      ]
    };
  },
  created() {
    // console.log(wx);
  },
  methods: {
    // 点击名片
    onevaSheetLook(item) {
      console.log(item);
      this.$router.push({
        name: "businessCard",
        params: {
          data: item
        }
      });
    },
    // 服务单详情
    generatingOrders() {
      this.$router.push({
        name: "serviceOrdersDetail",
        params: {
          data: null
        }
      });
    }
  },
  mounted() {
      
  }
};
</script>
<style lang="scss" scoped="">
@import "@/assets/scss/base.scss"; /*引入配置*/
.acc-search-engineer {
  background-color: $background-color-theme;
  padding: 20px 40px;
  border-radius: 10px;
  .title {
    width: 100%;
    height: 60px;
    line-height: 60px;
    font-size: $font_medium_s;
    position: relative;
    font-weight: bold;
    color: $font-color-shallow3;
  }
  .title::before {
    position: absolute;
    content: "";
    left: -30px;
    top: 14px;
    width: 8px;
    height: 30px;
    background-color: $background-color-theme1;
  }
  .stip {
    color: $font-color-shallow9;
    font-size: $font_little_s;
    padding-top: 10px;
  }
  .phone-box {
    overflow: hidden;
    padding: 20px 0;
    & > * {
      float: left;
    }
    .iconfont {
      color: #4095fb;
      font-weight: bold;
      margin-right: 20px;
    }
    .this-stip {
      line-height: 32px;
      float: right;
      color: $font-color-shallow9;
      font-size: 24px;
    }
  }
  .engineer-list {
    .engineer {
      border-radius: 16px;
      position: relative;
      width: 621px;
      // height: 344px;
      padding: 20px;
      border: 2px solid #DEDEDE;
      margin-top: 20px;
      .index {
        position: absolute;
        left: 20px;
        top: 20px;
        width: 88px;
        height: 88px;
        text-align: center;
        line-height: 88px;
        font-family: "AdihausDIN-Medium";
        color: $font-color-shallow3;
        font-weight: bold;
        font-size: $font_medium;
        overflow: hidden;
      }
      .index::before {
        border-radius: 16px;
      }
      p {
        margin-left: 120px;
        margin-top: 10px;
      }
      .text-2 {
        color: $font-color-shallow9;
        font-size: $font_little_s;
        .businees-number {
          margin-left: 10px;
        }
      }
      .eg-box {
        margin-top: 40px;
        padding-top: 10px;
        position: relative;
        .stip {
          margin-top: 6px;
        }
        .iconfont-set {
          position: absolute;
          bottom: 20px;
          right: 20px;
          font-size: 44px;
          color: #8c929f;
        }
      }
    }
  }
}
</style>
<style lang="scss">
@import "@/assets/scss/base.scss"; /*引入配置*/
.acc-search-engineer .weui-media-box_appmsg .weui-media-box__hd {
  margin-left: 0;
  height: 100px;
  margin-right: 20px;
  width: 100px;
}
.acc-search-engineer .weui-media-box__desc {
  margin-top: 10px;
}
</style>
