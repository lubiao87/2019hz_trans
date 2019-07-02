<template>
  <div class="acc-search">
    <div class="title">
      绑定账号查
    </div>
    <div class="stip">
      当前绑定账号
    </div>
    <div class="phone-box">
      <span class="iconfont">&#xe61b;</span>
      <div class="phone-number">189****4556</div>
      <div class="this-stip">手机号</div>
    </div>
  </div>
</template>
<script>
// import { mapState, mapGetters, mapActions } from "vuex"; //先要引入
// import { Search, Panel } from "vux";
// import { listSearchMixin } from "../../mixin"; //混淆请求
// import { api2 } from "../../api/api"; //api配置请求的路径
// import qs from "qs";

export default {
  components: {
    // Search,
    // Panel
  },
  // mixins: [listSearchMixin],
  data: function() {
    return {
      title: "绑定账号查"
    };
  },
  created() {
    // console.log(wx);
  },
  methods: {},
  mounted() {}
};
</script>
<style lang="scss" scoped="">
@import "@/assets/scss/base.scss"; /*引入配置*/
.acc-search {
  background-color: $background-color-theme;
  padding: 0px 40px;
  border-radius: 10px;
  .title {
    width: 100%;
    height: 80px;
    line-height: 80px;
    font-size: $font_medium_s;
    position: relative;
    font-weight: bold;
    color: $font-color-shallow3;
  }
  .stip {
    color: $font-color-shallow9;
    font-size: $font_little_s;
    padding-top: 10px;
  }
}
</style>
<style lang="scss">
@import "@/assets/scss/base.scss"; /*引入配置*/
</style>
