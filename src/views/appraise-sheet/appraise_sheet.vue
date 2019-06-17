<template>
  <div class="appraise-sheet">
    <div class="header">
      <p class="p1">你好修障工作已完成！</p>
      <p class="p2">请你对张师傅的修障服务评级</p>
    </div>
    <div class="user-data">
      <div class="head-portrait"></div>
      <div class="name">张师傅</div>
      <div class="phone">13365454456</div>
      <div class="address">江北营销服务中心</div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex"; //先要引入

// import BMap from "BMap";
export default {
  components: {},
  data: function() {
    return {
      title: "评价服务",
      colorChange: false,
      items: {
        productName: Math.random(),
        price: new Date().getTime()
      },
      showBack: false
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
  .user-data {
  }
}
</style>
