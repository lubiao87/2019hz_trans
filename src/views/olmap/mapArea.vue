<template>
  <div class="mapArea">
    <div id="locationMap" class="locationMap"></div>
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
import { Search } from "vux";
import BMap from "BMap";
import HZJSON from "@/assets/json/custom_map_config.json";
import wx from "weixin-js-sdk";
import { listSearchMixin } from "../../mixin"; //混淆请求
import { api2 } from "../../api/api"; //api配置请求的路径
import qs from "qs";

export default {
  components: {
    Search
  },
  mixins: [listSearchMixin],
  data: function() {
    return {
      title: "区域服务工程师",
      map: null,
      styleJson: HZJSON,
      results: [],
      value: ""
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
  created() {
    console.log(wx);
  },
  methods: {
    mapintialize() {
      // console.log(this.styleJson);
      let self = this;
      this.map = new BMap.Map("locationMap"); // 创建地图实例
      this.map.centerAndZoom(new BMap.Point(113.280771, 23.147166), 12); // 初始化地图，设置中心点坐标和地图级别
      // this.map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
      // var opts = { type: "BMAP_NAVIGATION_CONTROL_SMALL" };

      this.map.setMapStyle({ styleJson: this.styleJson }); //地图风格
      // var geolocation = new BMap.Geolocation();
      // geolocation.getCurrentPosition(
      //   function(r) {
      //     if (this.getStatus() == 0) {
      //       var mk = new BMap.Marker(r.point);
      //       self.map.addOverlay(mk);
      //       self.map.panTo(r.point);
      //       //   alert("您的位置：" + r.point.lng + "," + r.point.lat);
      //     } else {
      //       //   alert("failed" + this.getStatus());
      //     }
      //   },
      //   { enableHighAccuracy: true }
      // );

      // this.map.addControl(
      //   new BMap.ScaleControl({ offset: new BMap.Size(150, 5), type: 'BMAP_NAVIGATION_CONTROL_SMALL' })
      // );
      // this.map.addControl(
      //   new BMap.OverviewMapControl({ offset: new BMap.Size(150, 5) })
      // );
      this.map.addControl(
        new BMap.MapTypeControl({
          offset: new BMap.Size(30, 60),
          type: "BMAP_NAVIGATION_CONTROL_SMALL"
        }) //地图类型
      );
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
    },
    getWXSignature() {
      const self = this;

      let data = {
        url: "hztxfw.gdyuhui.net/txfwapp"
      };
      let param = {
        url: api2.txfwappSrc, //获取request_url.js文件的请求路径
        data: qs.stringify(data),
        contentType: "application/x-www-form-urlencoded; charset=UTF-8"
      };
      self.indexs = 0;
      self.sendReq(param, res => {
        console.log(res);
        alert(res.appId);
      });
    }
  },
  mounted() {
    this.mapintialize();
    this.getWXSignature();
  }
};
</script>
<style lang="scss" scoped="">
@import "@/assets/scss/base.scss"; /*引入配置*/

.mapArea {
  width: 100%;
  height: 100%;
  .locationMap {
    height: 100%;
  }
  .lb-search {
    position: absolute;
    top: 10px !important;
    left: 0;
    right: 0;
    margin: auto;
    width: 90%;
    // height: 100px;
    color: $font-color-theme;
    background-color: transparent;
  }
}
</style>
