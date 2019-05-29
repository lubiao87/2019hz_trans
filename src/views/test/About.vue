<template>
  <div class="about">
    <b-head :showBack="true" :title="title"></b-head>
    <div
      @click="invokePushItems(items)"
      :class="{ red: colorChange }"
      class="btn"
    >
      哈哈了
    </div>
    <ul>
      <li v-for="(val, index) in arrList" :key="index">
        <h5>{{ val.productName }}</h5>
        <div>{{ val.price }}</div>
      </li>
      <li>lililili</li>
    </ul>
    <!-- <div :title="title" :showBack="showBack"></div> -->
    <div id="content">
      <p @click="changeTheme('theme1')">theme1</p>
      <p @click="changeTheme('theme2')">theme2</p>
      <p @click="changeTheme('theme3')">theme3</p>
    </div>
    <div id="allmap" class="allmap"></div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex"; //先要引入
import BHead from "@/components/base/B-Head";
import BMap from "BMap";
export default {
  components: {
    BHead
  },
  data: function() {
    return {
      title: "测试页面",
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
    ]),
    changeTheme(theme) {
      console.log(window.document.documentElement);
      window.document.documentElement.setAttribute("data-theme", theme);
    }
  },
  mounted() {
    // console.log(this.$store.state);
    var map = new BMap.Map("allmap"); // 创建地图实例
    var point = new BMap.Point(116.331398, 39.897445); // 创建点坐标
    map.centerAndZoom(point, 12); // 初始化地图，设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    map.setCurrentCity("武汉"); // 仅当设置城市信息时，MapTypeControl的切换功能才能可用
    map.setMapStyle({ style: "midnight" }); //地图风格
  },
  watch: {
    // $route(to, from) {
    //   console.log(to.name);
    //   this.$store.dispatch("footerStatus/showFooter"); //这里改为'footerStatus/showFooter',
    //   //意思是指footerStatus.js里actions里的showFooter方法
    // }
  }
};
</script>
<style lang="scss" scoped="">
@import "@/assets/scss/base.scss"; /*引入配置*/
.btn {
  margin-top: 10px;
  @include bg_color($background-color-theme);
}
p:first-child {
  background-color: red;
}
p:nth-child(2) {
  background-color: #652bf5;
}
p:last-child {
  background-color: deepskyblue;
}
.allmap {
  height: 300px;
}
</style>
<style>
.anchorBL {
  display: none;
}
</style>
