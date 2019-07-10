<template>
  <div class="area-search">
    <b-head :showBack="true" :title="title"></b-head>
    <div id="allmap" class="allmap"></div>
    <search
      style="position: flex;"
      :results="results"
      v-model="value"
      auto-scroll-to-top
      @on-focus="onFocus"
      @on-cancel="onCancel"
      @on-submit="onSubmit"
      ref="search"
      class="lb-search"
      placeholder="请输入查找"
    ></search>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex"; //先要引入
import Search from "vux/src/components/search";
import BHead from "@/components/base/B-Head";
import BMap from "BMap";
export default {
  components: {
    BHead,
    Search
  },
  data: function() {
    return {
      title: "我要找工程师",
      showBack: false,
      value: "",
      results: []
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
    },
    mapintialize() {
      this.map = new BMap.Map("allmap"); // 创建地图实例
      this.point = new BMap.Point(113.376989, 23.1287725);
      this.map.centerAndZoom(this.point, 15);
      this.map.setMapStyle({ styleJson: this.styleJson }); //地图风格
      var myIcon = new BMap.Icon(
        "./img/ellipse-label.png",
        new BMap.Size(25, 33),
        { imageOffset: new BMap.Size(0, -10) }
      );
      this.marker = new BMap.Marker(this.point, { icon: myIcon }); // 创建标注
      this.map.addOverlay(this.marker); // 将标注添加到地图中
    },
    onSubmit() {
      console.log("onSubmit");
      this.$refs.search.setBlur();
    },
    onFocus() {
      console.log("on focus");
    },
    onCancel() {
      console.log("onCancel");
    }
  },
  mounted() {
    this.mapintialize();
  }
};
</script>
<style lang="scss" scoped="">
@import "@/assets/scss/base.scss"; /*引入配置*/
.area-search {
  .base-box {
    position: relative;
  }
  .allmap {
    height: 80%;
  }
  .lb-search {
    position: relative;
    margin: auto;
    width: 90%;
    // height: 100px;
    color: $font-color-theme;
    background-color: transparent;
  }
  .allmap {
    position: absolute !important;
    top: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
<style lang="scss">
@import "@/assets/scss/base.scss"; /*引入配置*/
.area-search {
  .BMap_Marker > div {
    height: 92px !important;
    overflow: inherit !important;
  }
  .BMap_Marker > div > img {
    width: 44px;
    height: 72px;
  }
  .vux-search-box {
    padding: 0;
  }
  .weui-search-bar {
    background-color: transparent;
    padding: 0;
  }
}
</style>
