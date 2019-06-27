<template>
  <div class="generating-orders">
    <b-head :showBack="true" :title="title"></b-head>
    <div class="content">
      <div class="gray-bg"></div>
      <group v-for="(item, index) in menuList" :key="index">
        <x-input
          :title="item.title"
          v-model="item.value"
          :placeholder="item.placeholder"
          :disabled="item.disabled"
          :show-clear="false"
          placeholder-align="right"
        ></x-input>
      </group>
      <div class="gray-bg"></div>
      <group
        v-for="(item, index) in menuList2"
        :key="index + 'a'"
        :class="{ 'product-acc': item.title === '产品账号' }"
      >
        <x-input
          v-if="item.title !== '装机地址'"
          :title="item.title"
          v-model="item.value"
          :placeholder="item.placeholder"
          :disabled="item.disabled"
          :show-clear="false"
          placeholder-align="right"
        ></x-input>
        <x-icon
          type="ios-arrow-right"
          v-if="item.title === '产品账号'"
          class="cell-x-icon"
          size="26"
        ></x-icon>
        <!-- 装机地址 -->
        <div
          class="weui-cell disabled address-border"
          v-if="item.title === '装机地址'"
        >
          <div class="weui-cell__hd">
            <label
              for="vux-x-input-ttg57"
              class="weui-label"
              style="width: 5em;"
              >装机地址</label
            >
          </div>
          <div
            class="weui-cell__bd weui-cell__primary vux-x-input-placeholder-right"
            style="text-align: right;"
          >
            {{ item.value }}
          </div>
        </div>
      </group>
      <div class="gray-bg"></div>

      <group class="obstacles" title="报障内容">
        <x-textarea
          :max="100"
          placeholder="请输入报障内容"
          @on-focus="textareaEvent('focus')"
          @on-blur="textareaEvent('blur')"
        ></x-textarea>
      </group>
      <!-- -----------------上传图片 ------------------ -->
      <img-uploader />
      <group class="obstacles obstacles2" title="期望上门时间">
        <div class="pleaseChoose">{{ homeTime }}</div>
        <div class="date-box">
          <datetime
            class="minuteListValue"
            v-model="minuteListValue"
            format="YYYY/MM/DD"
            @on-change="minuteChange"
          ></datetime>
          <datetime
            class="HHMMListValue"
            v-model="HHMMListValue"
            format="HH:mm"
            @on-change="minuteChange1"
          ></datetime>
          <datetime
            class="HHMMListValue2"
            v-model="HHMMListValue2"
            format="HH:mm"
            @on-change="minuteChange2"
          ></datetime>
        </div>
      </group>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex"; //先要引入
import BHead from "@/components/base/B-Head";
import ImgUploader from "@/components/imgUploader/imgUploader";
import { XInput, Group, XButton, Cell, XTextarea, Datetime } from "vux";

export default {
  components: {
    BHead,
    XInput,
    XButton,
    Group,
    Cell,
    XTextarea,
    ImgUploader,
    Datetime
  },
  data: function() {
    return {
      title: "生成服务单",
      colorChange: false,
      showBack: true,
      menuList: [
        {
          title: "服务单号",
          value: "NDC233435645",
          placeholder: "",
          disabled: true
        },
        {
          title: "用户名称",
          value: "张宇",
          placeholder: "",
          disabled: true
        },
        {
          title: "用户电话",
          value: "13332147878",
          placeholder: "",
          disabled: true
        },
        {
          title: "联系人姓名",
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
      menuList2: [
        {
          title: "产品账号",
          value: "ADSL 7758234",
          placeholder: "",
          disabled: true
        },
        {
          title: "装机地址",
          value: "广东省广州市天河区***佳都商务大厦 西塔801",
          placeholder: "",
          disabled: true
        },
        {
          title: "装维经理",
          value: "张三",
          placeholder: "",
          disabled: true
        },
        {
          title: "装维电话",
          value: "13332147878",
          placeholder: "",
          disabled: true
        }
      ],
      minuteListValue: "",
      minuteShow: false,
      HHMMListValue: "09:00",
      HHMMListValue2: "10:00",
      HHmmeShow1: false,
      HHmmeShow2: false
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
    }),
    homeTime() {
      let value =
        this.minuteListValue +
        " " +
        this.HHMMListValue +
        " - " +
        this.HHMMListValue2;
      return value;
    }
  },
  created() {
    this.minuteListValue = this.getNowFormatDate();
  },
  methods: {
    ...mapActions("collection", [
      //collection是指modules文件夹下的collection.js
      "invokePushItems" //collection.js文件中的actions里的方法，在上面的@click中执行并传入实参
    ]),
    textareaEvent(e) {
      console.log(e);
    },
    minuteChange(e) {
      console.log("日期", e);
    },
    minuteChange1(e) {
      console.log("日期", e);
    },
    minuteChange2(e) {
      console.log("日期", e);
    },
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped="">
@import "@/assets/scss/base.scss"; /*引入配置*/
.btn {
  margin-top: 10px;
  @include bg_color($background-color-theme);
}
.generating-orders {
  .content {
    margin-top: 100px;
    font-size: $font_little;
    .weui-cells {
      font-size: $font_little;
    }
    .address-border {
      overflow: hidden;
      border-bottom: 1px solid $border-color-theme;
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
  }
}
</style>
<style lang="scss">
@import "@/assets/scss/base.scss"; /*引入配置*/
.generating-orders {
  .weui-input {
    text-align: right;
    color: $font-color-shallow0;
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
      margin-top: -30px;
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
    .minuteListValue {
      width: 54%;
      height: 100%;
      float: left;
    }
    .HHMMListValue {
      width: 23%;
      height: 100%;
      float: left;
    }
    .HHMMListValue2 {
      width: 23%;
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
