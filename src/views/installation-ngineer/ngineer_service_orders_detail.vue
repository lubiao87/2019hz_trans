<template>
  <div class="ngineer-service-orders-detail">
    <b-head :showBack="true" :title="title"></b-head>
    <div class="content">
      <div class="gray-bg"></div>
      <group
        class="vux-1px-b"
      >
        <x-input
          title="当前状态"
          v-model="orderStatus"
          disabled
          :show-clear="false"
          placeholder-align="right"
        ></x-input>
      </group>
      <group v-for="(item, index) in menuList" :key="index" class="vux-1px-b">
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
        class="vux-1px-b"
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
          class="weui-cell disabled address-border vux-1px-b"
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
        <div
          data-v-a07515dc=""
          class="weui-cell vux-x-textarea"
        >
          <div class="weui-cell__bd">
            <div class="weui-textarea" v-html="textareaValve"></div>
          </div>
        </div>
        <div class="vue-uploader">
          <div class="file-list">
            <section
              class="file-item draggable-item"
              v-for="(item, index) in obstaclePics"
              :key="index + 'img'"
            >
              <img alt="" ondragstart="return false;" :src="item.src" />
            </section>
          </div>
        </div>
      </group>
      <group class="obstacles obstacles2" title="期望上门时间">
        <div class="pleaseChoose" @click="showdateSingle = true">
          {{ homeTime}}
        </div>
      </group>
      <div class="gray-bg"></div>
      <group class="obstacles" title="处理回单内容">
        <x-textarea
          :max="100"
          :rows="3"
          placeholder="请输入处理内容"
          @on-focus="textareaEvent('focus')"
          @on-blur="textareaEvent('blur')"
          v-model="textareaValve2"
        ></x-textarea>
      </group>
      <!-- -----------------上传图片 ------------------ -->
      <img-uploader @childrenData="getChildData" class="obstacles3" />
      <group
        title="故障类型"
        class="enclosure-box obstacles enclosure2"
      >
        <!-- <x-input
          class="obstacles"
          title="故障类型"
          v-model="faultType"
          disabled
          :show-clear="false"
          placeholder-align="right"
        ></x-input> -->
        <popup-picker
          :data="list1"
          v-model="faultType"
          @on-show="onShow"
          @on-hide="onHide"
          @on-change="onChange"
          placeholder="请选择"
        >
          <template slot="title">
            <span class="iconfont">&#xe656;</span>
          </template>
        </popup-picker>
      </group>
      <group
        class="enclosure-box obstacles vux-1px-t"
        title="附件"
      >
        <div class="in" @click="enclosurePage">
          在线聊天记录/通话录音
        </div>
      </group>
      <div class="foot-box">
        <div class="cancel-btn" @click="cancelBack">
          取消
        </div>
        <div class="confirm-btn vux-1px" @click="confirmOrders">
          提交
        </div>
      </div>
    </div>
    <date
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
    </date-hours>

    <!-- 确认推送 -->
    <div v-transfer-dom class="business-card3" v-show="show5">
      <confirm
        v-model="show5"
        ref="confirm5"
        title="确定将服务单推送给张宇吗？"
        @on-cancel="onCancel"
        @on-confirm="onConfirm5"
        @on-show="onShow5"
        @on-hide="onHide"
      >
      </confirm>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex"; //先要引入
import BHead from "@/components/base/B-Head";
import ImgUploader from "@/components/imgUploader/imgUploader";
import {
  XInput,
  Group,
  XTextarea,
  Confirm,
  PopupPicker,
  TransferDomDirective as TransferDom
} from "vux";
import date from "@/components/datepicker/datePicker";
import dateHours from "@/components/datepicker/dateHours";
import  { listSearchMixin } from "@/mixin";
import {api} from "@/api/api"

export default {
  mixins: [listSearchMixin],
  directives: {
    TransferDom
  },
  components: {
    BHead,
    XInput,
    Group,
    XTextarea,
    ImgUploader,
    date,
    dateHours,
    Confirm,
    PopupPicker
  },
  data: function() {
    return {
      title: '服务单详情',
      colorChange: false,
      showBack: true,
      menuList: [
        {
          title: "服务单号",
          value: "",
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
      showSingle: "",
      showdateSingle: false,
      dateOptionsSingle: {
        // scrollEnd: true, // 滚到最后
        start: "2019-06-28",
        maxDate: "24m", // 月份跨度
        isDoubleCheck: false
        // startDate: this.formatDate(new Date().getTime())
      },
      HHMMListValue: "12:00 ~ 14:00",
      // HHMMListValue2: "14:00",
      showdateHours: false,
      show5: false,
      textareaValve: "",
      childData: {},
      orderStatus: '处理中',
      textareaValve2: '',
      obstaclePics: [], //报障图片
      list1: [["固话故障", "IPTV故障", "智能组网故障", "宽带故障"]],
      faultType: []
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
      arrList: "renderCollects",
    }),
    homeTime() {
      let value = this.showSingle + " " + this.HHMMListValue;
      return value;
    }
  },
  created() {
    this.dateOptionsSingle = {
      // scrollEnd: true, // 滚到最后
      start: this.getNowFormatDate("-"),
      maxDate: "24m", // 月份跨度
      isDoubleCheck: false
      // startDate: this.formatDate(new Date().getTime())
    };
    this.showSingle = this.getNowFormatDate("/");
    this.getOrderId();
  },
  methods: {
    ...mapActions("collection", [
      //collection是指modules文件夹下的collection.js
      "invokePushItems" //collection.js文件中的actions里的方法，在上面的@click中执行并传入实参
    ]),
    textareaEvent(e) {
      console.log(e);
    },
    changeDateSingle(start, end) {
      console.log(start, end);
      if (start) {
        this.showSingle = start;
        this.showdateHours = true;
      }
    },
    changeDateHours(value) {
      console.log("changeDateHours", value);
      this.HHMMListValue = value[0];
    },
    getNowFormatDate(FH) {
      var date = new Date();
      var seperator1 = FH;
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
    },
    getChildData(data) {
      console.log("getChildData", data);
      this.childData = data;
    },
    confirmOrders() {
      if(!this.textareaValve) {
        this.$vux.toast.show({
          text: '请输入处理内容',
          type: 'text',
          position: 'middle'
        })
        return;
      }
      if(this.textareaValve.length > 100) {
        this.$vux.toast.show({
          text: '请控制在100字以内',
          type: 'text',
          position: 'middle'
        })
        return;
      }
      this.show5 = true;
    },
    onShow5() {
      // this.$refs.confirm5.setInputValue("13802147411");
      console.log("onShow5");
    },
    onConfirm5() {
      const self = this;
      console.log("onConfirm5");
      let params = {
        url: api.generateOrder,
        data: {
          "content": this.textareaValve,
          "orderId": this.menuList[0].value,
          "productNumber":"ADSL12345685",
          "custId":"5687445",
          "linkman":"小黄",
          "linkphone":12345678965,
          "productAddress":"天河区建中路66号",
          "expectTime":"2019-07-17 10:00",
          "repairoperId":"6556322",
          "source":0
        }
      }
      self.sendReq(params, (res) => {
        if(res.respHeader.resultCode == 0) {
          self.$vux.toast.text("推送成功！");
          self.$store.dispatch("collection/ORDERS_DATA", {
            state: 0,
            stateValue: "处理中"
          });
          this.$router.go(-1);
        }
      })
    },
    onHide() {
      console.log("on hide");
    },
    onCancel() {
      console.log("on cancel");
    },
    getOrderId() {
      let params = {
        method: 'GET',
        url: api.getOrderId
      }
      this.sendReq(params, res => {
        if(res.respHeader.resultCode == 0) {
          this.menuList[0].value = res.respBody.orderId;
        }
      })
    },
    cancelBack() {
      this.$router.go(-1);
    },
    /****
     * 故障类型
     *  */
    onShow() {
      console.log("on show");
    },
    onHide(type) {
      console.log("on hide", type);
    },
    onChange(val) {
      console.log("val change", val);
    },
    //查看聊天记录
    enclosurePage() {
      this.$router.push({
        name: "enclosurePage",
        params: {
          data: { id: 23 }
        }
      });
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
.ngineer-service-orders-detail {
  .content {
    margin-top: 100px;
    overflow-x: hidden;
    font-size: $font_little;

    .group-1 {
      position: relative;
      // display: none;
      .group-btn {
        position: absolute;
        right: 40px;
        top: 26px;
        .cuidan,
        .zhuantousu {
          display: inline-block;
          height: 44px;
          color: $font-color-theme1;
          line-height: 44px;
          background-color: $font-color-theme2;
          text-align: center;
          padding: 0px 10px;
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
        padding: 10px 20px;
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
        padding-right: 20px;
      }
      .date-box {
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
    .obstacles3 {
      // padding: 0 20px;
    }
    .foot-box {
      width: 100%;
      height: 160px;
      box-shadow: $border-color-theme 10px 0px 20px 4px;
      display: flex;
      padding: 20px;
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
  }
}
</style>
<style lang="scss">
@import "@/assets/scss/base.scss"; /*引入配置*/
.ngineer-service-orders-detail {
  .enclosure-box {
    display: flex;
    align-items: center;
    .weui-cells__title {
      flex: 1;
    }
    .weui-cells {
      flex: 3;
    }
    .in {
      float: right;
      padding-right: 20px;
      color: $font-color-theme2;
    }
    // justify-content: flex-end;
    .vux-x-input .weui-input {
      color: $font-color-theme2;
      -webkit-text-fill-color: $font-color-shallow0;
    }
  }
  // 选择框
  .enclosure2 {
    .weui-cell .weui-cell__hd {
      float: right;
      width: 60px;
      span {
        float: right;
        color: $font-color-theme;
      }
    }
  }
  .weui-input {
    text-align: right;
    color: $font-color-shallow0;
  }
  // 状态 【处理中】样式
  .state2 {
    .weui-label {
      color: $font-color-theme;
    }
    .product-acc .weui-cell .weui-cell__bd {
      padding-right: 20px;
    }
    .weui-textarea-counter {
      display: none;
    }
    .foot-box {
      display: none !important;
    }
    .weui-cells__title {
      color: $font-color-theme;
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
  .vux-x-input.weui-cell > .vux-toast {
    display: none;
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
      margin-top: -26px;
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
    .HHMMListValue {
      width: 46%;
      height: 100%;
      float: left;
    }
    // .HHMMListValue2 {
    //   width: 23%;
    //   height: 100%;
    //   float: left;
    // }
  }
  .weui-cells__title {
    color: $font-color-shallow0;
    font-size: $font_medium_s;
    margin-top: 10px;
  }
}
// // 弹窗框
.business-card3 .weui-dialog__bd {
  display: none;
}
.business-card3 .weui-dialog__hd {
  height: 100px;
  line-height: 100px;
  padding: 0;
}
.business-card3 .weui-dialog__hd .weui-dialog__title {
  font-size: $font_medium_s;
}
.business-card3 .weui-dialog__ft {
  padding: 0;
}
.business-card3 .weui-dialog__ft > a {
  height: 80px;
  line-height: 80px;
  color: $font-color-theme2;
}
.business-card3 .weui-dialog__btn_default {
  border-right: 1px solid $border-color-theme;
}
.business-card3 .weui-dialog {
  border-radius: 20px;
}
// alert
.vux-alert {
  .weui-dialog__bd {
    display: none;
  }
  .weui-dialog > .weui-dialog__hd {
    padding: 0;
    height: 100px;
    line-height: 100px;
    strong {
      font-size: $font_medium_s;
    }
  }
}
</style>
