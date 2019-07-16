<template>
  <div class="advice">
    <b-head :showBack="true" :title="title"></b-head>
    <div class="content">
      <div class="top">
        <span>总体评价</span>
        <rater v-model="data3" :max="5" active-color="#04BE02" star="✩"></rater>
      </div>
      <div class="middle">
        <div class="modules1">
          <group title="default" class="group1">
            <div class="title">1. 投诉问题是否解决</div>
            <radio :options="radio001" @on-change="change"></radio>
          </group>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Rater } from "vux";
import { Radio } from "vux";
import { mapState, mapGetters, mapActions } from "vuex"; //先要引入
import BHead from "@/components/base/B-Head";
import ImgUploader from "@/components/imgUploader/imgUploader";
import { XInput, Group, XTextarea } from "vux";
import FloatBtn from "@/components/dragBox/floatBtn";

export default {
  components: {
    BHead,
    Rater,
    Radio
  },
  data: function() {
    return {
      title: "投诉建议单评价",
      radio001: ["是", "否"],
      data3: "3"
    };
  },
  computed: {},
  created() {},
  methods: {},
  mounted() {},
  watch: {}
};
</script>
<style lang="scss" scoped="">
@import "@/assets/scss/base.scss"; /*引入配置*/
.advice {
  .content {
    .top {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 57px 0;
      span {
        margin-right: 45px;
        font-size: 32px;
        font-family: PingFang-SC-Medium;
        font-weight: bold;
        color: $font-color-themesec;
      }
    }
    .middle {
      .group1 {
        display: flex;
      }
    }
  }
}
</style>
<style lang="scss">
@import "@/assets/scss/base.scss"; /*引入配置*/
.advice {
  .base-box {
    position: relative;
  }
  .weui-cell__ft {
    width: 40px;
    height: 40px;
  }
  .weui-cells_radio .weui-check:checked + .weui-icon-checked:before {
    display: block;
    content: "\EA08";
    color: #fff;
    font-size: 0.21333rem;
    border: 2px solid $border-color-theme1;
    border-radius: 20px;
    text-align: center;
    background: $font-color-theme2;
  }
  .weui-cells_radio .weui-check + .weui-icon-checked:before {
    display: block;
    content: "\EA08";
    color: $border-color-theme1;
    font-size: 0.21333rem;
    border: 2px solid #4487f6;
    border-radius: 20px;
    text-align: center;
    background: #fff;
    width: 100%;
    height: 100%;
    line-height: 0.53333rem;
  }
  .weui-cells_radio .weui-cell__ft {
    padding-left: 0;
  }
  .weui-icon-checked {
    width: 100%;
    height: 100%;
  }
  .weui-cells_radio {
    display: flex;
  }
  .weui-check__label:active {
    /* background-color: #ECECEC; */
    display: flex;
  }
  .weui-cell {
    display: flex;
  }
}
</style>
