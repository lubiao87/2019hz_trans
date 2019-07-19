<template>
  <div class="wook-time">
    <b-head :showBack="true" :title="title"></b-head>
    <div class="content">
      <group class="lb-group">
        <popup-picker
          title="我的工作状态"
          :data="list1"
          v-model="faultType1"
          placeholder="请选择"
          class="lb-popup"
        >
        </popup-picker>
        <popup-picker
          title="忙碌时间段"
          :data="list2"
          v-model="faultType2"
          placeholder="请选择"
          class="lb-popup"
        >
        </popup-picker>
      </group>
      <div class="query">确定</div>
      <!-- <group class="lb-group">
        <popup-picker
          title="忙碌时间段"
          :data="list2"
          v-model="faultType2"
          placeholder="请选择"
          class="lb-popup"
        >
        </popup-picker>
      </group> -->
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex"; //先要引入
import BHead from "@/components/base/B-Head";
import { PopupPicker, Group, TransferDomDirective as TransferDom } from "vux";

export default {
  directives: {
    TransferDom
  },
  components: {
    BHead,
    PopupPicker,
    Group
  },
  data: function() {
    return {
      title: "我的工作状态",
      faultType1: [],
      list1: [["忙碌", "在线", "空闲", "离岗"]],
      faultType2: [],
      list2: [["08:00-09:00", "9:00-10:00", "10:00-11:00", "11:00-12:00"]]
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
      MyordersData: "renderOrdersData"
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
.wook-time {
  .base-box {
    position: relative;
  }
  .content {
    position: relative;
    // margin-top: 100px;
    overflow-x: hidden;
    font-size: $font_little;
    background-color: $background-color-themesec;
    padding: 40px;
    .lb-group {
      border-radius: 10px;
      overflow: hidden;
    }
    .query {
      width: 80%;
      height: 80px;
      background-color: $background-color-theme1;
      color: $font-color-theme1;
      text-align: center;
      line-height: 80px;
      margin: 30px auto;
      border-radius: 40px;
    }
  }
}
</style>
<style lang="scss">
@import "@/assets/scss/base.scss"; /*引入配置*/
.wook-time {
  .lb-group {
    .lb-popup {
      .weui-cell__hd,
      .vux-cell-primary {
        height: 70px;
        border-bottom: 0.5px solid $border-color-theme;
      }
    }
    .lb-popup:last-child {
      .weui-cell__hd,
      .vux-cell-primary {
        height: 70px;
        border-bottom: none;
      }
    }
  }
}
</style>
