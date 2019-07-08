<template>
  <div class="other-search">
    <div class="title">
      其他方式查
      <popover placement="bottom" class="popover-box">
        <div slot="content" class="popover-demo-content">
          <p>手机号：</p>
          <p>即机主预留的手机号（需验证身份）;</p>
          <p>宽带/IPTV/固话接入号示例:</p>
          <p>1.宽带接入号: ADSLD20379***</p>
          <p>2.宽带账号（多媒体账号): 02061774@***</p>
          <p>3.IPTV接入号: 0204472***</p>
          <p>4.IPTV账号（多媒体账号）: gzITV20488315***</p>
          <p>5.固定电话: 8413***</p>
          <p>6.智能组网: ZNZW189***</p>
        </div>
        <span class="iconfont">&#xe62d;</span>
      </popover>
    </div>
    <div class="search-box">
      <search
        style="position: flex;"
        :results="results"
        v-model="value"
        auto-scroll-to-top
        @on-focus="onFocus"
        @on-cancel="onCancel"
        @on-submit="onSubmit"
        ref="search"
        class="lb-search"
        placeholder="手机号/宽带/固话/IPTV接入号"
      ></search>
    </div>
    <div class="submit-btn" :disabled="false" @click="showInputBox">
      查询
    </div>
  </div>
</template>
<script>
// import { mapState, mapGetters, mapActions } from "vuex"; //先要引入
// import { Search, Panel } from "vux";
// import { listSearchMixin } from "../../mixin"; //混淆请求
// import { api2 } from "../../api/api"; //api配置请求的路径
// import qs from "qs";
// import Panel from "vux/src/components/panel";
import Search from "vux/src/components/search";
import Popover from "vux/src/components/popover";

export default {
  components: {
    Search,
    Popover
    // Panel
  },
  // mixins: [listSearchMixin],
  data: function() {
    return {
      title: "其它方式查",
      results: [],
      value: ""
    };
  },
  created() {
    // console.log(wx);
  },
  methods: {
    onSubmit() {
      console.log("onSubmit");
      this.$refs.search.setBlur();
    },
    onFocus() {
      console.log("on focus");
    },
    onCancel() {
      console.log("onCancel");
    },
    showInputBox() {
      this.$emit("childrenData", true);
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped="">
@import "@/assets/scss/base.scss"; /*引入配置*/
.other-search {
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
    .popover-box {
      width: 60px;
      height: 60px;
      float: right;
      .iconfont {
        font-size: 50px;
        color: $font-color-theme;
        font-weight: 400;
      }
    }
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
  .search-box {
    position: relative;
    height: 120px;
  }
  .submit-btn {
    margin-top: 30px;
    width: 100%;
    height: 88px;
    text-align: center;
    line-height: 88px;
    font-size: $font_medium_s;
    color: $font-color-theme1;
    background-color: $background-color-theme1;
    border-radius: 44px;
  }
  .submit-btn:active {
    opacity: 0.8;
  }
  .submit-btn[disabled="disabled"] {
    opacity: 0.6;
  }
}
.popover-demo-content {
  padding: 20px;
  width: 100%;
  p {
    margin-top: 10px;
    font-size: $font_little_s;
    width: 100%;
    line-height: 30px;
  }
}
</style>
<style lang="scss">
@import "@/assets/scss/base.scss"; /*引入配置*/
// 搜索框
.other-search .vux-search-box {
  width: 100%;
  top: 20px !important;
}
.other-search .weui-search-bar {
  background-color: $background-color-theme;
}
.other-search .weui-search-bar__form {
  background-color: $background-color-theme;
}
.other-search .weui-search-bar__form:after {
  border: none;
}
.other-search
  .weui-search-bar.weui-search-bar_focusing
  .weui-search-bar__cancel-btn {
  display: none;
}
.other-search .weui-search-bar__box .weui-icon-search {
  height: 88px;
  width: 88px;
  border-right: 1px solid $border-color-theme;
  left: 0;
  float: left;
  display: block;
}
.other-search .weui-icon-search {
  height: 88px;
  width: 88px;
  left: 0;
  display: block;
  border-right: 1px solid $border-color-theme;
  float: left;
  background: url("../../assets/images/phone-search.png") no-repeat center;
  background-size: 40%;
}
.other-search .weui-icon-search:before {
  content: "";
}
.other-search .weui-search-bar__box {
  padding-left: 110px;
  padding-right: 0;
  border: 1px solid $border-color-theme;
  border-radius: 8px;
}
.other-search .weui-search-bar__box .weui-search-bar__input {
  height: 88px;
  line-height: 88px;
  padding: 0;
  font-size: $font_little;
}
.other-search .vux-search-box {
  padding: 0;
}
.other-search .weui-search-bar {
  padding: 0;
}
.other-search .weui-search-bar__form:after {
  height: 180%;
}
.other-search .weui-search-bar__label {
  display: none;
}
.other-search .vux-search-mask {
  width: 100%;
}

// 提示框
.v-transfer-dom {
  max-width: 60% !important;
  left: 34% !important;
  padding-left: 20px;
  background-color: rgba(25, 27, 37, 0.8) !important;
  border-radius: 8px !important;
  text-indent: -12px;
  padding-bottom: 10px;
}
body .vux-popover-arrow-up {
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-bottom: 12px solid rgba(25, 27, 37, 0.8);
  left: 87%;
  top: -10px;
}
</style>
