<template>
  <div class="generating-orders">
    <b-head :showBack="true" :title="title"></b-head>
    <div class="content">
      <div class="gray-bg"></div>
      <!-- <group class="vux-1px-b group-1 state2-box">
        <div class="group-btn">
          <div class="cuidan">催单</div>
          <div class="zhuantousu">转投诉</div>
        </div>
      </group> -->
      <group
        v-for="(item, index) in menuList"
        :key="index"
        class="vux-1px-b"
        :class="{ 'product-acc': item.title === '产品账号' }"
      >
        <x-input
          :title="item.title"
          v-model="item.value"
          :placeholder="item.placeholder"
          :disabled="item.disabled"
          :show-clear="false"
          placeholder-align="right"
          @click.native="getProductCount(item.title)"
        ></x-input>
        <x-icon
          type="ios-arrow-right"
          v-if="item.title === '产品账号'"
          class="cell-x-icon"
          size="26"
        ></x-icon>
      </group>

      <div class="gray-bg"></div>

      <group class="obstacles" title="报障内容">
        <x-textarea
          :max="100"
          :rows="2"
          placeholder="请输入报障内容"
          @on-focus="textareaEvent('focus')"
          @on-blur="textareaEvent('blur')"
          v-model="textareaValve"
        ></x-textarea>
      </group>
      <!-- -----------------上传图片 ------------------ -->
      <img-uploader @childrenData="getChildData" />
      <group class="obstacles obstacles2" title="期望上门时间">
        <div class="pleaseChoose" @click="showdateSingle = true">
          {{ homeTime }}
        </div>
      </group>

      <div class="foot-box">
        <div class="cancel-btn" @click="cancelBack">
          取消
        </div>
        <div class="confirm-btn vux-1px" @click="confirmOrders">
          确定2
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
import date from "@/components/datepicker/datePicker";
import dateHours from "@/components/datepicker/dateHours";
import FloatBtn from "@/components/dragBox/floatBtn";
import  { listSearchMixin } from "@/mixin";
import {api} from "@/api/api"

export default {
  mixins: [listSearchMixin],
  components: {
    BHead,
    XInput,
    FloatBtn,
    Group,
    XTextarea,
    ImgUploader,

    date,
    dateHours
  },
  data: function() {
    return {
      title: "一键快速报障",
      colorChange: false,
      showBack: true,
      menuList: [
        {
          title: "服务单号",
          value: "",
          placeholder: "",
          disabled: true,
        },
        {
          title: "产品账号",
          value: "",
          placeholder: "请查询产品账号",
          disabled: true,
        },
        {
          title: "用户名称",
          value: "",
          placeholder: "",
          disabled: true,
        },
        {
          title: "用户电话",
          value: "",
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
      floatText: "我的报障记录",
      textareaValve: ''//报障内容
    };
  },
  computed: {
    ...mapState({
      //这里的...是超引用，ES6的语法，意思是state里有多少属性值我可以在这里放多少属性值
      isShow: state => state.footerStatus.showFooter, //注意这些与上面的区别就是state.footerStatus,
      // arrList: state => state.collection.collects
      //里面定义的showFooter是指footerStatus.js里state的showFooter
    }),
    ...mapGetters("collection", {
      //用mapGetters来获取collection.js里面的getters
      arrList: "renderCollects",
    }),
    ...mapGetters("lookEngineer", {
      productCount: 'getProductCount'
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
      console.log(data);
    },
    // 点击浮动窗事件
    floatClick() {
      // console.log("点击浮动窗");
      const self = this;
      this.$router.push({
        name: "baoZhan",
        params: {
          tabName: 'accountNow'
        }
      });
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
    //提交报障
    confirmOrders() {
      if(!this.textareaValve) {
        this.$vux.toast.show({
          text: '请输入报障内容',
          type: 'text',
          position: 'middle',
          width: '50%'
        })
        return;
      }
      if(this.textareaValve.length > 100) {
        this.$vux.toast.show({
          text: '请控制在100字以内',
          type: 'text',
          position: 'middle',
          width: '50%'
        })
        return;
      }
      let formData = new FormData();
      formData.append("reportContent",this.textareaValve);
      formData.append("orderId",this.menuList[0].value);
      formData.append("productNumber",this.menuList[1].value);
      formData.append("custId",'6845555');
      formData.append("linkman","小黄");
      formData.append("linkphone",1344446666);
      formData.append("productAddress","天河区建中路66号");
      formData.append("expectTime","2019-07-17 10:00");
      formData.append("repairoperId","9999855");
      formData.append("source",2);
      formData.append("file",this.childData);
      let params = {
        url: api.reportingObstacles,
        contentType: 'form-data',
        data: formData
      }
      this.sendReq(params, res => {
        if(res.respHeader.resultCode == 0) {
          this.$vux.toast.show({
            text: "提交成功！",
            type: 'text',
            position: 'middle',
            width: '50%'
          });
          this.$router.push({name: 'baoZhan', params: {tabName: 'accountNow'}});
        }
      })
    },
    getProductCount(name) {
      if(name === '产品账号') {
        this.$router.push({name: 'lookEngineer',params: {routerName: 'quickReport'}})
      }
    }
  },
  watch: {
    productCount: {
      handler(count,old) {
        this.menuList[1].value = count;
      },
      immediate: true,
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
      & > div {
        flex: 1;
        display: flex;
        align-content: center;
        justify-content: center;
        line-height: 80px;
        height: 80px;
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
.generating-orders {
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
</style>
