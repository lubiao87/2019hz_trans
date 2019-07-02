<template>
  <div class="mapArea">
    <div class="title">
      区域查
      <div class="f5">
        <span class="iconfont" @click="refreshMap">&#xe626;</span>
      </div>
    </div>
    <div id="locationMap" class="locationMap"></div>
    <div class="current-location">
      <div class="stip">
        当前位置
      </div>
      <div class="location-btn vux-1px-b flex">
        <div class="location-img">
          <div></div>
        </div>
        <div class="text">惠州电信大厦</div>
        <div class="arrow-right flex-middle">
          <x-icon type="ios-arrow-right" size="24"></x-icon>
        </div>
      </div>
      <div class="panel-boxs">
        <p class="result">所在区域为您找到 <span>1</span> 名服务工程师</p>
        <div class="panel-box">
          <panel
            :list="panelList"
            type="1"
            @on-click-item="onevaSheetLook"
          ></panel>
          <span class="iconfont iconfont-set">&#xe68b;</span>
        </div>
      </div>
    </div>

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
      v-show="false"
    ></search>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex"; //先要引入
import { Search, Panel } from "vux";
import BMap from "BMap";
import HZJSON from "@/assets/json/custom_map_config.json";
import wx from "weixin-js-sdk";
import { listSearchMixin } from "../../mixin"; //混淆请求
import { api2 } from "../../api/api"; //api配置请求的路径
import qs from "qs";

export default {
  components: {
    Search,
    Panel
  },
  mixins: [listSearchMixin],
  data: function() {
    return {
      title: "区域服务工程师",
      map: null,
      styleJson: HZJSON,
      results: [],
      value: "",
      panelList: [
        {
          src: "./img/kehu-1.png",
          title: "彭于浩",
          desc: "江北营销服务中心",
          id: 384
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
  created() {
    // console.log(wx);
  },
  methods: {
    mapintialize() {
      const self = this;
      this.map = new BMap.Map("locationMap"); // 创建地图实例
      this.point = new BMap.Point(113.376989, 23.1287725);
      this.map.centerAndZoom(this.point, 15);
      this.map.setMapStyle({ styleJson: this.styleJson }); //地图风格
      var myIcon = new BMap.Icon(
        "./img/map-location.png",
        new BMap.Size(50, 65)
      );
      this.marker = new BMap.Marker(this.point, { icon: myIcon }); // 创建标注
      this.map.addOverlay(this.marker); // 将标注添加到地图中
      this.marker.setAnimation("BMAP_ANIMATION_BOUNCE"); //跳动的动画

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
    },
    refreshMap() {
      this.point = new BMap.Point(113.376989, 23.1287725);
      this.map.centerAndZoom(this.point, 15);
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
      self.sendReq(param, data => {
        console.log("getWXSignature： ", data);
        // alert(data.appId);
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: data.appId, // 必填，公众号的唯一标识
          timestamp: data.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.nonceStr, // 必填，生成签名的随机串
          signature: data.signature, // 必填，签名
          jsApiList: ["getLocation"] // 必填，需要使用的JS接口列表
        });
        wx.ready(self.checkJsApiFn());
      });
    },
    checkJsApiFn() {
      const self = this;
      wx.checkJsApi({
        jsApiList: ["getLocation"]
      });
      var opt = {
        type: "wgs84", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: self.checkJsApiSuccess
      };
      wx.getLocation(opt);
    },
    checkJsApiSuccess(res) {
      alert("纬度: " + res.latitude + ", 经度： " + res.longitude);
      console.log("checkJsApiSuccess :" + res);
    },
    // 点击名片
    onevaSheetLook(item) {
      console.log(item);
      this.$router.push({
        name: "generatingOrders",
        params: {
          data: item
        }
      });
    }
  },
  mounted() {
    this.mapintialize();
    // this.getWXSignature();
  }
};
</script>
<style lang="scss" scoped="">
@import "@/assets/scss/base.scss"; /*引入配置*/

.mapArea {
  background-color: $background-color-theme;
  padding: 0px 40px;
  border-radius: 10px;
  .title {
    width: 100%;
    height: 80px;
    line-height: 80px;
    font-size: $font_medium_s;
    position: relative;
    font-weight: bold;
    color: $font-color-shallow3;
    .f5 {
      position: absolute;
      width: 30px;
      height: 30px;
      right: 0;
      top: 20px;
      span {
        display: block;
        height: 100%;
        position: absolute;
        top: 0;
        line-height: 30px;
        color: $font-color-shallow9;
      }
    }
  }
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 740px;
  .locationMap {
    height: 274px;
  }
  .stip {
    color: $font-color-shallow9;
    font-size: $font_little_s;
    padding-top: 30px;
  }
  .current-location {
    width: 100%;
    .location-btn {
      padding-top: 10px;
      padding-bottom: 14px;
      // height: 60px;
      width: 100%;
      align-items: center;
      .location-img {
        flex: 2;
        div {
          height: 30px;
          width: 20px;
          background: url(../../assets/images/location-icon.png) no-repeat
            center;
          background-size: 100%;
        }
      }

      .text {
        flex: 24;
      }
      .arrow-right {
        flex: 2;
        .vux-x-icon {
          fill: $font-color-shallow9;
        }
      }
    }
    .panel-boxs {
      margin-top: 20px;
      width: 100%;
      .result {
        color: $font-color-shallow9;
        font-size: $font_little_s;
        height: 40px;
        span {
          color: $font-color-theme2;
        }
      }
      .panel-box {
        position: relative;
        .iconfont-set {
          position: absolute;
          right: 0px;
          bottom: 20px;
          font-size: 48px;
          color: #8c929f;
        }
      }
    }
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
<style lang="scss">
@import "@/assets/scss/base.scss"; /*引入配置*/
.mapArea .weui-media-box_appmsg .weui-media-box__hd {
  margin-left: 0;
  width: 100px;
  height: 100px;
}
.mapArea .weui-media-box__title {
  padding: 5px 0;
}
.mapArea .BMap_Marker > div > img {
  width: 100px;
  height: 130px;
}
</style>
