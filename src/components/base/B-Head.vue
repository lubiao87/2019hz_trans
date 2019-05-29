<template>
  <div class="base-box">
    <div class="base-container flex flex-middle">
      <span class="head-back" v-if="showBack" @click="goBack"></span>
      <span class="head-title table-cell">{{ title }}</span>
      <span class="head-slot">
        <slot name="head-right"></slot>
      </span>
    </div>
  </div>
</template>

<script>
// import {  } from 'vux'
export default {
  name: "B-Head",
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
      height: 26px;
      background: url("../../assets/images/return.png") no-repeat center;
      background-size: 100%;
    }
    .head-title {
      font-size: $font_medium_s;
      font-weight: 500;
      color: #fefefe;
    }
    .head-slot {
      position: absolute;
      right: 30px;
    }
  }
}
</style>
