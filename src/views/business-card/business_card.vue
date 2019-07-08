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
            <span>4.9</span>
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
              v-model="starsData"
              :margin="8"
              :font-size="30"
              :class="{ stars5: starsData > 4 && starsData < 5 }"
              class="rater-in"
            ></rater>
          </div>
        </div>
      </div>
      <div class="contact-btn">
        <div class="online-chat">
          <span class="iconfont">&#xe64b;</span>
          在线聊天
        </div>
        <div class="online-call">
          <span class="iconfont">&#xe657;</span>
          一键呼叫
        </div>
      </div>
      <!-- <div class="gray-bg"></div> -->
    </div>
  </div>
</template>
<script>
// import Tab from "vux/src/components/tab";
// import TabItem from "vux/src/components/tab/tab-item";
import { Rater } from "vux";
import BHead from "@/components/base/B-Head";

export default {
  components: {
    BHead,
    Rater
    // Tab,
    // TabItem
    // Grid
  },
  data: function() {
    return {
      title: "工程师名片",
      starsData: 4.9
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
.business-card {
}
</style>
