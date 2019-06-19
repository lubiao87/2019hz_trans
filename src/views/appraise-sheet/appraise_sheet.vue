<template>
  <div class="appraise-sheet">
    <div class="header">
      <p class="p1">你好修障工作已完成!</p>
      <p class="p2">请你对张师傅的修障服务评级</p>
    </div>
    <div class="user-data">
      <div class="list">
        <panel :list="userInfo" type="1"></panel>
      </div>
    </div>
    <div>
      <div class="sheet-list">
        <div class="line"></div>
        <div class="list" v-for="(item, index) in starsEvaluate" :key="index">
          <span class="text">{{ item.name }}</span>
          <rater v-model="item.stars" :margin="8" :font-size="30"></rater>
        </div>
      </div>
      <div
        style="width: 120%; height:10px; background:rgba(239,239,244,1);margin-left: -10%;"
      ></div>
      <div class="check-list">
        <div class="problem">
          <span class="problem-span">装维工程师是否提供便民服务? </span>
          <checker
            v-model="problemStr"
            default-item-class="demo1-item"
            selected-item-class="demo1-item-selected"
          >
            <checker-item value="是">
              <span class="checker-span">是</span>
              <check-icon :value.sync="checkYes" disabled></check-icon>
            </checker-item>
            <checker-item value="否">
              <span class="checker-span">否</span>
              <check-icon :value.sync="checkNo" disabled></check-icon>
            </checker-item>
          </checker>
        </div>
        <div class="check-box" v-show="checkYes">
          <checklist
            title=""
            :options="commonList"
            v-model="checkSelect"
            :max="2"
            @on-change="checkChange"
            >23423</checklist
          >
          <x-textarea
            v-show="TextareaShow"
            :max="10"
            :rows="1"
            placeholder="请输入提供的便民服务"
            @on-focus="onEvent('focus')"
            @on-blur="onEvent('blur')"
            v-model="textareaInput"
          ></x-textarea>
        </div>
      </div>
      <p class="tc stip" v-show="checkYes">请选择1-2项服务内容</p>
      <div
        style="width: 120%; height:10px; background:rgba(239,239,244,1);margin-left: -10%;"
      ></div>
      <div class="primary-btn">
        <x-button @click.native="primarySubmit" type="primary">提交</x-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex"; //先要引入
import {
  Panel,
  Rater,
  CheckIcon,
  Checker,
  CheckerItem,
  Checklist,
  XTextarea,
  XButton,
  TransferDomDirective as TransferDom
} from "vux";
// import BMap from "BMap";
export default {
  directives: {
    TransferDom
  },
  components: {
    Panel,
    Rater,
    CheckIcon,
    Checker,
    CheckerItem,
    Checklist,
    XTextarea,
    XButton
  },
  data: function() {
    return {
      title: "评价服务",
      colorChange: false,
      items: {
        productName: Math.random(),
        price: new Date().getTime()
      },
      showBack: false,
      userInfo: [
        {
          src: "./img/chatman.png",
          title: "张师傅",
          desc: `<p class="user-text">133****1132</p><p class="user-text">江北营销服务中心</p>`,
          id: 333
        }
      ],
      starsEvaluate: [
        {
          stars: 0,
          name: "总体评价"
        },
        {
          stars: 0,
          name: "按约上门"
        },
        {
          stars: 0,
          name: "服务态度"
        },
        {
          stars: 0,
          name: "保障质量"
        }
      ],
      problemStr: "否",
      commonList: [
        "手机电脑安全监测",
        "软件APP安装辅导",
        "自购路由器设备调测",
        "老旧明网线更换",
        "信息箱线路整理",
        "其它"
      ],
      checkSelect: [],
      textareaInput: ""
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
    checkYes: {
      get() {
        return this.problemStr === "是";
      },
      set(val) {
        return val;
      }
    },
    checkNo: {
      get() {
        return this.problemStr === "否";
      },
      set(val) {
        return val;
      }
    },
    TextareaShow: {
      get() {
        return this.checkSelect.indexOf("其它") > -1;
      },
      set(val) {
        console.log(val);
        return val;
      }
    }
  },
  created() {},
  methods: {
    ...mapActions("collection", [
      //collection是指modules文件夹下的collection.js
      "invokePushItems" //collection.js文件中的actions里的方法，在上面的@click中执行并传入实参
    ]),
    checkChange(val, label) {
      console.log("change", val, label);
    },
    onEvent(event) {
      // console.log("on", event);
      console.log("textareaInput", this.textareaInput);
    },
    primarySubmit() {
      console.log("提交什么");
    }
  }
};
</script>
<style lang="scss" scoped="">
@import "@/assets/scss/base.scss"; /*引入配置*/

.appraise-sheet {
  width: 100%;
  height: 100%;
  font-size: 28px;
  padding: 30px;
  color: $font-color-theme3;
  overflow-x: hidden;
  overflow-y: scroll;
  .header {
    width: 582px;
    margin: auto;
    border-bottom: 1px solid $border-color-theme;
    // padding-top: 10px;
    p {
      width: 100%;
      text-align: center;
      padding: 10px;
    }
    .p1 {
      color: $font-color-theme3;
      font-size: $font_medium;
    }
    .p2 {
      color: $font-color-shallow9;
      font-size: $font_little_s;
    }
  }
  .user-text {
    color: $font-color-theme3;
  }
  .sheet-list {
    width: 100%;
    position: relative;
    padding-top: 20px;
    padding-bottom: 20px;
    .line {
      width: 582px;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      // bottom: 0;
      margin: auto;
      border-bottom: 0.01333rem solid $border-color-theme;
    }
    .list {
      width: 100%;
      display: flex;
      align-items: center;
      margin-top: 10px;
      .text {
        display: inline-block;
        margin-right: 50px;
        margin-left: 60px;
        font-weight: 600;
        font-size: 32px;
        color: $font-color-theme3;
      }
    }
  }
  .check-list {
    width: 100%;
    padding: 20px 0;
    .problem {
      width: 100%;
      display: flex;
      align-items: center;
      font-size: 32px;
      padding-top: 20px;
      .problem-span {
        padding-top: 2px;
      }
      .checker-span {
        display: inline-block;
        height: 40px;
        line-height: 40px;
        vertical-align: middle;
        padding-top: 2px;
        width: 40px;
      }
    }
    .check-box {
      margin-top: 20px;
    }
  }
  .stip {
    color: $font-color-shallow9;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .primary-btn {
    width: 100%;
    padding: 20px;
  }
}
</style>
<style lang="scss">
@import "@/assets/scss/base.scss"; /*引入配置*/
.appraise-sheet .weui-media-box_appmsg .weui-media-box__hd {
  width: 28px;
  height: 28px;
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;
}
.appraise-sheet a.weui-media-box {
  color: $font-color-theme3;
}
.appraise-sheet .check-box p {
  font-size: 32px;
}
</style>
