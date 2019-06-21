<template>
  <div class="home">
    <img
      class="logo-img"
      src="../../assets/images/HZTMH_home_icon_background.png"
      alt=""
    />
    <div class="grid-box">
      <grid :cols="2">
        <grid-item
          :label="item.title"
          v-for="(item, index) in menuList"
          :key="index"
          @click.native="routerGo(item)"
        >
          <img slot="icon" :src="item.imgSrc" />
        </grid-item>
      </grid>
    </div>
    <!-- <p class="tc foot-stip">
      Guangdong Yuhui Communication Technology Co., Ltd.
    </p>
    <p class="tc foot-stip">provides technical support</p> -->
  </div>
</template>
<script>
import { Grid, GridItem, AlertModule } from "vux";
export default {
  components: {
    Grid,
    GridItem
  },
  data: function() {
    return {
      menuList: [
        {
          title: "我要找工程师",
          routerLink: "mapArea",
          imgSrc: "./img/HZTMH_home_icon_engineer@3x.png"
        },
        {
          title: "一键快速报障",
          routerLink: "home",
          imgSrc: "./img/HZTMH_home_icon_Reportingobstacles@3x.png"
        },
        {
          title: "服务进度查询",
          routerLink: "home",
          imgSrc: "./img/HZTMH_home_icon_query@3x.png"
        },
        {
          title: "智慧家庭方案",
          routerLink: "home",
          imgSrc: "./img/HZTMH_home_icon_SmartFamily@3x.png"
        },
        {
          title: "自助查障助手",
          routerLink: "home",
          imgSrc: "./img/HZTMH_home_icon_assistant@3x.png"
        },
        {
          title: "投诉建议反馈",
          routerLink: "chatOnline",
          imgSrc: "./img/HZTMH_home_icon_feedback@3x.png"
        }
      ]
    };
  },
  created() {},
  mounted() {
    // this.alertShow();
  },
  methods: {
    routerGo(item) {
      console.log(item);
      this.$router.push({ name: item.routerLink, params: { data: item } });
    },
    alertShow() {
      AlertModule.show({
        title: "温馨提示",
        content: "您未绑定公众号，请先绑定再参加活动哦",
        buttonText: "前往绑定",
        onShow() {
          console.log("Module: I'm showing");
        },
        onHide() {
          console.log("Module: I'm hiding now");
        }
      });
    }
  }
};
</script>

<!--Add"scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="">
@import "@/assets/scss/base.scss"; /*引入配置*/
.home {
  width: 100%;
  font-size: 30px;
  background-color: #289bf0;
  .logo-img {
    display: block;
    width: 100%;
  }
  .grid-box {
    padding-bottom: 20px;
    background-color: #289bf0;
  }
  .router-btn {
    padding: 20px 30px;
  }
  .foot-stip {
    padding-top: 6px;
    width: 80%;
    margin: auto;
    font-size: 20px;
    color: $font-color-theme1;
    opacity: 0.6;
  }
}
</style>
<style lang="scss">
@import "@/assets/scss/base.scss"; /*引入配置*/
.home {
  .weui-grids:before {
    border-top: 0.01333rem solid transparent;
  }
  .weui-grid:before {
    border-right: 0.01333rem solid transparent;
  }
  .weui-grid:after {
    border-bottom: 0.01333rem solid transparent;
  }
  .weui-grids {
    padding: 10px;
    overflow: hidden;
  }
  .weui-grid {
    padding: 20px;
    padding-bottom: 0px;
    .weui-grid__icon {
      width: 100%;
      border-radius: 10px 10px 0 0;
      height: 180px;
      overflow: hidden;
      background-color: $background-color-theme;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 130px;
        height: 130px;
      }
    }
    .weui-grid__label {
      padding: 20px;
      border-radius: 0 0 10px 10px;
      overflow: hidden;
      background-color: $background-color-theme;
    }
    .weui-grid__icon + .weui-grid__label {
      margin-top: 0;
      height: 80px;
      font-size: 30px;
    }
  }
  .weui-grid:nth-child(2n + 1) {
    padding-right: 0px;
  }
}
</style>
