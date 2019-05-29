<template>
  <div class="base-box">
    <div class="base-container flex flex-middle">
      <span class="head-back" v-if="showBack" @click="goBack">
        <x-icon type="ios-arrow-left" size="30"></x-icon>
      </span>
      <span class="head-title table-cell">{{ title }}</span>
      <span class="head-slot">
        <slot name="head-right"></slot>
      </span>
    </div>
  </div>
</template>

<script>
// import { Group, Cell } from "vux";
export default {
  name: "B-Head",
  // components: {
  //   Group,
  //   Cell
  // },
  props: {
    title: {
      type: String
    },
    showBack: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    goBack() {
      // alert('触发')
      // alert(window.history.length)
      this.$router.go(-1);
      // window.history.length > 1
      //   ? this.$router.go(-1)
      //   : this.$router.push('/')
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/scss/base.scss"; /*引入配置*/
.base-box {
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #ccc;
  // background: #4c9ffb;
  @include bg_color($background-color-theme);
  .base-container {
    position: relative;
    height: 100%;
    .head-back {
      position: absolute;
      left: 30px;
      display: inline-block;
      width: 20px;
      height: 28px;
      line-height: 28px;
      font-size: 28px;
      color: #666;
      // background: url("../../assets/images/return.png") no-repeat center;
      background-size: 100%;
    }
    .head-title {
      font-size: $font_medium_s;
      font-weight: bold;
      color: #666;
    }
    .head-slot {
      position: absolute;
      right: 30px;
    }
  }
}
</style>
