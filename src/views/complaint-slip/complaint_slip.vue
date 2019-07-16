<template>
  <div class="complaint-slip">
    <b-head :showBack="true" :title="title"></b-head>
    <div class="content">
      <div class="gray-bg"></div>
      <group class="vux-1px-b group-1 state2-box">
        <div class="group-btn">
          <div class="cuidan">催单</div>
          <div class="zhuantousu">转投诉</div>
        </div>
      </group>
      <group
        v-for="(item, index) in menuList"
        :key="index"
        class="vux-1px-b"
        :class="{ 'slip-type': item.title === '类型' }"
      >
        <x-input
          :title="item.title"
          v-model="item.value"
          :placeholder="item.placeholder"
          :disabled="item.disabled"
          :show-clear="false"
          placeholder-align="right"
        ></x-input>
        <div v-if="item.title === '类型'" class="radio-box">
          <input
            type="radio"
            name="slipType"
            id="paixu1"
            value="投诉"
            v-model="checkedValue"
          />
          <label for="paixu1">投诉</label>
          <input
            type="radio"
            name="slipType"
            id="paixu2"
            value="建议"
            v-model="checkedValue"
          />
          <label for="paixu2">建议</label>
        </div>
      </group>

      <div class="gray-bg"></div>

      <group class="obstacles" title="报障内容">
        <x-textarea
          :max="100"
          :rows="2"
          placeholder="请输入报障内容"
          @on-focus="textareaEvent('focus')"
          @on-blur="textareaEvent('blur')"
        ></x-textarea>
      </group>
      <!-- -----------------上传图片 ------------------ -->
      <img-uploader @childrenData="getChildData" />

      <!-- <group class="obstacles obstacles2" title="期望上门时间">
        <div class="pleaseChoose" @click="showdateSingle = true">
          {{ homeTime }}
        </div>
      </group> -->

      <div class="foot-box" v-if="state === 1">
        <div class="cancel-btn">
          取消
        </div>
        <div class="confirm-btn vux-1px" @click="confirmOrders">
          确定
        </div>
      </div>
    </div>
    <!-- <date
      :showCalendar.sync="showdateSingle"
      maxDate="12m"
      :options="dateOptionsSingle"
      @changeDate="changeDateSingle"
    ></date>
    <date-hours
      :showCalendar.sync="showdateHours"
      :date.sync="showSingle"
      @changeDate="changeDateHours"
    >
    </date-hours> -->
    <div class="gray-bg"></div>
    <complaint-state v-if="state > 1"></complaint-state>
    <float-btn
      :text="floatText"
      @onFloatBtnClicked="floatClick"
      :key="floatText"
      :itemWidth="130"
    />
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex"; //先要引入
import BHead from "@/components/base/B-Head";
import ImgUploader from "@/components/imgUploader/imgUploader";
import { XInput, Group, XTextarea } from "vux";
import FloatBtn from "@/components/dragBox/floatBtn";
import complaintState from "./complaint_state";
export default {
  components: {
    BHead,
    XInput,
    FloatBtn,
    Group,
    XTextarea,
    ImgUploader,
    complaintState
  },
  data: function() {
    return {
      title: "投诉建议单",
      colorChange: false,
      showBack: true,
      menuList: [
        {
          title: "投诉单号",
          value: "NDC233435645",
          placeholder: "",
          disabled: true
        },
        {
          title: "服务单号",
          value: "NDC233435645",
          placeholder: "",
          disabled: true
        },
        {
          title: "类型",
          value: "",
          placeholder: "",
          disabled: true
        },
        {
          title: "投诉联系人",
          value: "",
          placeholder: "请输入联系人姓名",
          disabled: false
        },
        {
          title: "联系人电话",
          value: "",
          placeholder: "请输入联系人电话",
          disabled: false
        }
      ],
      showSingle: "",
      showdateSingle: false,
      floatText: "我的投诉记录",
      checkedValue: "投诉",
      state: 1
    };
  },
  computed: {
    ...mapState({
      //这里的...是超引用，ES6的语法，意思是state里有多少属性值我可以在这里放多少属性值
      isShow: state => state.footerStatus.showFooter //注意这些与上面的区别就是state.footerStatus,
      // arrList: state => state.collection.collects
      //里面定义的showFooter是指footerStatus.js里state的showFooter
    }),
    ...mapGetters("collection", {
      //用mapGetters来获取collection.js里面的getters
      arrList: "renderCollects"
    })
  },
  created() {},
  methods: {
    ...mapActions("collection", [
      //collection是指modules文件夹下的collection.js
      "invokePushItems" //collection.js文件中的actions里的方法，在上面的@click中执行并传入实参
    ]),
    textareaEvent(e) {
      console.log(e);
    },
    getChildData(data) {
      console.log(data);
    },
    confirmOrders() {
      this.state = 2;
    },
    // 点击浮动窗事件
    floatClick() {
      // console.log("点击浮动窗");
      const self = this;
      this.$router.push({
        name: "touSu",
        params: {
          data: self.floatText
        }
      });
    }
  },
  mounted() {},
  watch: {
    checkedValue(val) {
      console.log(val);
    }
  }
};
</script>
<style lang="scss" scoped="">
@import "@/assets/scss/base.scss"; /*引入配置*/

.btn {
  margin-top: 10px;
  @include bg_color($background-color-theme);
}
.complaint-slip {
  .gray-bg {
    width: 100%;
    margin-left: 0;
  }
  .content {
    margin-top: 100px;
    overflow-x: hidden;
    font-size: $font_little;

    .group-1 {
      position: relative;
      .group-btn {
        position: absolute;
        right: 40px;
        top: 30px;
        .cuidan,
        .zhuantousu {
          display: inline-block;
          height: 44px;
          color: $font-color-theme1;
          line-height: 36px;
          background-color: $font-color-theme2;
          text-align: center;
          padding: 4px 10px;
          font-size: $font_little;
          letter-spacing: 4px;
          border-radius: 4px;
        }
      }
    }
    .zhuantousu {
      margin-left: 20px;
    }
    .weui-cells {
      font-size: $font_little;
    }
    .address-border {
      overflow: hidden;
      // border-bottom: 1px solid $border-color-theme;
      .weui-cell__hd {
        height: 100%;
        padding: 10px 20px;
      }
      .weui-cell__bd {
        padding: 10px 0;
      }
    }
    .obstacles:after {
      content: "*";
      position: absolute;
      left: 10px;
      top: 28px;
      color: red;
      font-size: 50px;
    }
    .obstacles {
      overflow: hidden;
      position: relative;
      .pleaseChoose {
        height: 50px;
        line-height: 50px;
        float: right;
      }
      .date-box {
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
    .foot-box {
      width: 100%;
      height: 140px;
      box-shadow: $border-color-theme 10px 0px 20px 4px;
      display: flex;
      padding: 20px;
      margin-top: 20px;
      & > div {
        flex: 1;
        display: flex;
        align-content: center;
        justify-content: center;
        height: 80px;
        line-height: 80px;
        font-size: $font_medium_s;
        margin: 0 20px;
      }
      & > div.vux-1px:before {
        border-color: $border-color-theme2;
        border-radius: 10px;
        overflow: hidden;
      }
      .cancel-btn {
        border-radius: 10px;
        overflow: hidden;
        color: $border-color-theme2;
        border: 2px solid $font-color-theme2;
      }
      .confirm-btn.vux-1px:before {
        content: "提交";
        background-color: $border-color-theme2;
        display: flex;
        align-content: center;
        justify-content: center;
        height: 160px;
        line-height: 160px;
        font-size: 64px;
        color: $font-color-theme1;
      }
      & > div:active {
        opacity: 0.6;
      }
    }
    .slip-type {
      .radio-box {
        overflow: hidden;
        & > input {
          display: none;
        }
        & > label {
          position: relative;
          height: 60px;
          display: block;
          width: 50%;
          float: left;
          padding-left: 50px;
        }
        & > label::before {
          display: inline-block;
          content: "";
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid $background-color-theme1;
          margin-right: 12px;
          margin-top: 6px;
          position: absolute;
          left: 0px;
          top: 2px;
        }
        & > input:checked + label::before {
          background-color: $background-color-theme;
          position: absolute;
          left: 0px;
          top: 2px;
        }
        & > input:checked + label::after {
          position: absolute;
          left: 8px;
          top: 16px;
          content: "";
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background-color: $background-color-theme1;
        }
      }
    }
  }
}
</style>
<style lang="scss">
@import "@/assets/scss/base.scss"; /*引入配置*/
.complaint-slip {
  .weui-input {
    text-align: right;
    color: $font-color-shallow0;
  }
  .slip-type {
    & > div {
      display: flex;
      justify-content: center;
      align-items: center;

      & > div {
        flex: 1;
      }
    }
  }
  .group-1 .weui-input {
    text-align: left;
    padding-left: 30px;
  }
  .vux-x-input.disabled .weui-input {
    -webkit-text-fill-color: $font-color-shallow0;
  }
  // x-input
  .weui-cell {
    display: block;
    .weui-cell__bd {
      width: 70%;
      padding-right: 20px;
      float: left;
    }
    .weui-cell__hd {
      width: 30%;
      padding-left: 20px;
      float: left;
    }
  }
  .vux-x-input.weui-cell > div {
    display: flex;
    align-items: center;
    height: 100%;
  }
  .weui-cell__ft {
    display: none !important;
  }
  .product-acc {
    position: relative;
    .weui-cell {
      .weui-cell__hd {
        float: left;
      }
      .weui-cell__bd {
        padding-right: 60px;
        float: left;
      }
    }
    .cell-x-icon {
      display: block;
      fill: $font-color-shallow9;
      position: absolute;
      right: 10px;
      top: 50%;
      margin-top: -28px;
    }
  }
  .vux-x-input.weui-cell {
    height: 100px;
  }
  .obstacles {
    padding: 20px;
    width: 100%;
    position: relative;

    .weui-cell {
      .weui-cell__bd {
        width: 100%;
      }
    }
  }
  .obstacles2 {
    .weui-cells__title {
      width: 40%;
      float: left;
    }
    .weui-cells {
      width: 60%;
      float: left;
    }
    .showSingle {
      width: 54%;
      height: 100%;
      float: left;
    }
  }
  .weui-cells__title {
    color: $font-color-shallow0;
    font-size: $font_medium_s;
    margin-top: 10px;
  }
}
</style>
