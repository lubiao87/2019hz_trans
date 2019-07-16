<template>
  <div class="business-card">
    <img src="../../assets/images/card-bg.png" alt="" class="card-img" />
    <b-head :showBack="true" :title="title"></b-head>
    <div class="content">
      <div class="inner-box">
        <div class="user-box">
          <img
            src="../../assets/images/china-telecom.png"
            alt="中国电信"
            class="logo"
          />
          <img
            src="../../assets/images/user-man-1.png"
            alt="用户头像"
            class="user-img"
          />
          <img src="../../assets/images/biao.png" alt="" class="user-badge" />
          <div></div>
        </div>
      </div>
      <div class="information-box">
        <div class="user-info vux-1px-b">
          <div class="name">董云龙</div>
          <div class="lucky-number">
            <img
              src="../../assets/images/stars-min.png"
              alt=""
              class="stars-img"
            />
            <span>{{ starsData }}</span>
            <img
              src="../../assets/images/arrow-small.png"
              alt=""
              class="arrow-img"
            />
          </div>
          <div>江北营销服务中心</div>
          <div class="rater-box">
            <span class="text">总体评价</span>
            <rater
              disabled
              v-model="starsData"
              :margin="8"
              :font-size="30"
              :class="{
                stars5: starsData > 4 && starsData < 5,
                stars4: starsData > 3 && starsData < 4,
                stars3: starsData > 2 && starsData < 3,
                stars2: starsData > 1 && starsData < 2,
                stars1: starsData > 0 && starsData < 1
              }"
              class="rater-in"
            ></rater>
          </div>
        </div>
      </div>
      <div class="contact-btn">
        <div class="online-chat" @click="routerGo('chatOnline')">
          <span class="iconfont">&#xe64b;</span>
          在线聊天
        </div>
        <div class="online-call" @click="onlineCall">
          <span class="iconfont">&#xe657;</span>
          一键呼叫
        </div>
      </div>
      <!-- <div class="gray-bg"></div> -->
    </div>
    <div v-transfer-dom class="business-card2" v-show="show5">
      <confirm
        v-model="show5"
        ref="confirm5"
        title="使用当前手机号码"
        @on-cancel="onCancel"
        @on-confirm="onConfirm5"
        @on-show="onShow5"
        @on-hide="onHide"
      >
        <input v-model="inputIphone" class="set-prompt-msgbox" />
        <span class="replace-iphone">更换</span>
      </confirm>
    </div>
  </div>
</template>
<script>
// import Tab from "vux/src/components/tab";
// import TabItem from "vux/src/components/tab/tab-item";
import {
  Rater,
  Confirm,
  // Group,
  // XInput,
  TransferDomDirective as TransferDom
} from "vux";
import BHead from "@/components/base/B-Head";

export default {
  directives: {
    TransferDom
  },
  components: {
    BHead,
    Rater,
    Confirm
    // XInput,
    // Group
    // Tab,
    // TabItem
    // Grid
  },
  data: function() {
    return {
      title: "工程师名片",
      starsData: 4.9,
      show5: false,
      inputIphone: 13802147468
    };
  },
  created() {},
  mounted() {
    // this.alertShow();
  },
  methods: {
    onTabClick(link) {
      this.viewsName = link;
    },
    getChildData(value) {
      console.log(value);
      this.showInputBox = value;
    },
    routerGo(item) {
      // console.log(item);
      this.$router.push({ name: item, params: { data: item } });
    },
    onShow5() {
      // this.$refs.confirm5.setInputValue("13802147411");
      console.log("onShow5");
    },
    onConfirm5() {
      console.log(this.inputIphone);
      // this.$refs.confirm5.setInputValue("");
      // this.$vux.toast.text("input value: " + this.inputIphone);
    },
    onHide() {
      console.log("on hide");
    },
    onCancel() {
      console.log("on cancel");
    },
    // 一键呼叫
    onlineCall() {
      this.show5 = true;
    }
  }
};
</script>

<!--Add"scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="">
@import "@/assets/scss/base.scss"; /*引入配置*/
.business-card {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #1883f0;
  .card-img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
  .base-box {
    position: relative;
  }
  .content {
    position: relative;
    width: 100%;
    padding: 30px;

    .inner-box {
      opacity: 0.9;
      width: 100%;
      z-index: 1;
      position: relative;
      // background-color: $background-color-theme;
      border-radius: 20px 20px 0 0;
      overflow: hidden;
      .user-box {
        padding: 30px;
        width: 100%;
        height: 660px;
        background: linear-gradient(
          138deg,
          rgba(161, 157, 171, 1),
          rgba(184, 182, 193, 1)
        );
        position: relative;
        .logo {
          position: absolute;
          width: 174px;
          top: 42px;
          left: 38px;
        }
        .user-img {
          width: 50%;
          position: absolute;
          bottom: 0;
          left: 50%;
          margin-left: -25%;
        }
        .user-badge {
          width: 61px;
          height: 77px;
          position: absolute;
          bottom: 40px;
          right: 40px;
        }
      }
    }
    .information-box {
      position: relative;
      background-color: $background-color-theme;
      padding: 20px;
      .user-info {
        padding: 0 20px;
        color: $font-color-theme;
        & > div {
          padding-top: 20px;
        }
        .name {
          font-size: $font_medium;
          font-weight: bold;
          color: $font-color-themesec;
        }
        .lucky-number {
          display: flex;
          align-items: center;
          color: $font-color-theme;
          .stars-img {
            width: 20px;
          }
          span {
            margin: 0 20px;
            color: $font-color-theme;
          }
          .arrow-img {
            height: 25px;
          }
        }
        .rater-box {
          display: flex;
          align-items: center;
          padding-bottom: 20px;
          .rater-in {
            margin-left: 60px;
          }
        }
      }
    }
    .contact-btn {
      position: relative;
      background-color: $background-color-theme;
      padding: 20px 40px 40px 40px;
      overflow: hidden;
      border-radius: 0 0 20px 20px;
      & > div {
        width: 280px;
        height: 80px;
        border-radius: 40px;
        color: #fff;
        line-height: 80px;
        text-align: center;
        float: left;
      }
      .online-chat {
        background-color: #18aff0;
      }
      .online-call {
        float: right;
        background-color: #15cd12;
      }
    }
  }
}
</style>
<style lang="scss">
@import "@/assets/scss/base.scss"; /*引入配置*/
.business-card .vux-rater-box .vux-rater-inner {
  background: url(../../assets/images/stars-small-opcity.png) no-repeat center;
  background-size: 100%;
}

.business-card .stars5 a:nth-child(6) .vux-rater-inner {
  background: url(../../assets/images/stars-small-opcity.png) no-repeat center;
  background-size: 100%;
}
.business-card .stars4 a:nth-child(5) .vux-rater-inner {
  background: url(../../assets/images/stars-small-opcity.png) no-repeat center;
  background-size: 100%;
}
.business-card .stars3 a:nth-child(4) .vux-rater-inner {
  background: url(../../assets/images/stars-small-opcity.png) no-repeat center;
  background-size: 100%;
}
.business-card .stars2 a:nth-child(3) .vux-rater-inner {
  background: url(../../assets/images/stars-small-opcity.png) no-repeat center;
  background-size: 100%;
}
.business-card .stars1 a:nth-child(2) .vux-rater-inner {
  background: url(../../assets/images/stars-small-opcity.png) no-repeat center;
  background-size: 100%;
}
// 弹窗框
.business-card2 .set-prompt-msgbox {
  width: 220px;
  height: 60px;
  font-size: $font_medium_s;
  border-bottom: 1px solid $border-color-theme;
}
.business-card2 .weui-dialog__btn_default {
  color: $font-color-theme2;
}
.business-card2 .weui-dialog__title {
  color: $font-color-theme;
  margin-top: 10px;
}
.business-card2 .weui-dialog__btn_primary {
  color: $font-color-theme2;
}
.business-card2 .weui-dialog {
  border-radius: 30px;
}
.business-card2 .replace-iphone {
  color: $border-color-theme2;
  margin-left: 20px;
}
</style>
