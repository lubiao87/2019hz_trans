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
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex"; //先要引入
import BHead from "@/components/base/B-Head";
import { XInput, Group, XButton, Cell } from "vux";

export default {
  components: {
    BHead,
    XInput,
    XButton,
    Group,
    Cell
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
      ]
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
    ])
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
        padding: 10px;
      }
      .weui-cell__bd {
        padding: 10px 0;
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
      padding-right: 10px;
      float: left;
    }
    .weui-cell__hd {
      width: 30%;
      padding-left: 10px;
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
}
</style>
