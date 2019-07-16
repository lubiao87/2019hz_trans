<template>
  <div class="advice">
    <b-head :showBack="true" :title="title"></b-head>
    <div class="content">
      <div class="top">
        <span>总体评价</span>
        <rater v-model="startValue" :max="5"></rater>
      </div>
      <div class="bg-ccc"></div>
      <div class="middle">
        <div class="modules1 vux-1px-b">
          <group class="group1">
            <div class="title">1. 投诉问题是否解决</div>
            <radio
              class="lb-radio"
              :options="radio001"
              @on-change="change1"
              v-model="optionModel1"
            ></radio>
          </group>
        </div>
        <div class="modules1 vux-1px-b">
          <group class="group1">
            <div class="title">2. 处理过程是否满意</div>
            <radio
              class="lb-radio"
              :options="radio002"
              @on-change="change2"
              v-model="optionModel2"
            ></radio>
          </group>
          <group class="obstacles" v-show="optionModel2 === '否'">
            <x-textarea
              :max="100"
              :rows="2"
              placeholder="请输入不满意的原因"
              @on-focus="textareaEvent('focus')"
              @on-blur="textareaEvent('blur')"
            ></x-textarea>
          </group>
        </div>
        <div class="modules1 vux-1px-b">
          <group class="group1">
            <div class="title">3. 意见或者建议</div>
            <radio
              class="lb-radio"
              :options="radio003"
              @on-change="change3"
              v-model="optionModel3"
            ></radio>
          </group>
          <group class="obstacles" v-show="optionModel3 === '否'">
            <x-textarea
              :max="100"
              :rows="2"
              placeholder="请输入投诉建议内容 拷贝"
              @on-focus="textareaEvent2('focus')"
              @on-blur="textareaEvent2('blur')"
            ></x-textarea>
          </group>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Rater } from "vux";
import { Radio } from "vux";
// import { mapState, mapGetters, mapActions } from "vuex"; //先要引入
import BHead from "@/components/base/B-Head";
// import ImgUploader from "@/components/imgUploader/imgUploader";
import { XInput, Group, XTextarea } from "vux";
import FloatBtn from "@/components/dragBox/floatBtn";

export default {
  components: {
    BHead,
    Rater,
    Radio,
    Group,
    XTextarea
  },
  data: function() {
    return {
      title: "投诉建议单评价",
      startValue: "3",
      radio001: ["是", "否"],
      optionModel1: "是",
      radio002: ["是", "否"],
      optionModel2: "否",
      radio003: ["是", "否"],
      optionModel3: "否"
    };
  },
  computed: {},
  created() {},
  methods: {
    change1(value, label) {
      console.log("change:", value, label);
    },
    change2(value, label) {
      console.log("change:", value, label);
    },
    change3(value, label) {
      console.log("change:", value, label);
    },
    textareaEvent(e) {
      console.log(e);
    },
    textareaEvent2(e) {
      console.log(e);
    }
  },
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
      padding: 50px 0;
      span {
        margin-right: 45px;
        font-size: 32px;
        font-family: PingFang-SC-Medium;
        font-weight: bold;
        color: $font-color-themesec;
      }
    }
    .middle {
      .obstacles {
        padding: 0 30px 30px;
      }
      .group1 {
        // display: flex;
        .vux-no-group-title {
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
</style>
<style lang="scss">
@import "@/assets/scss/base.scss"; /*引入配置*/
.advice {
  .vux-rater a {
    margin-right: 30px !important;
  }
  .bg-ccc {
    height: 20px;
    width: 100%;
    background-color: $background-color-themesec;
  }
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
    border: 2px solid $border-color-theme2;
    border-radius: 20px;
    text-align: center;
    background: $font-color-theme2;
  }
  .weui-cells_radio .weui-check + .weui-icon-checked:before {
    display: block;
    content: "\EA08";
    color: $border-color-theme1;
    font-size: 0.21333rem;
    border: 2px solid $border-color-theme2;
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
    display: block;
  }
  .weui-cells_radio {
    display: flex;
  }
  .weui-check__label:active {
    /* background-color: #ECECEC; */
    display: flex;
  }

  .middle {
    .vux-x-textarea.weui-cell {
      padding: 0;
    }
    .weui-textarea-counter {
      height: 70px;
    }
    .group1 {
      // display: flex;

      padding: 20px 30px;
      .vux-no-group-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        & > div {
          height: 80px;
          line-height: 80px;
        }
      }
      .weui-cell {
        display: flex;
        align-items: center;
        padding: 0;
      }
      .lb-radio {
        margin-right: 10px;
        .weui-cell__ft {
          margin-right: 20px;
        }
        .weui-cell__bd {
          margin-right: 20px;
        }
      }
    }
  }
}
</style>
