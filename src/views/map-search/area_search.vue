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
      @on-change="changefield"
      @result-click="resultClick"
      ref="search"
      class="lb-search"
      placeholder="请输入查找"
    ></search>
    <div
      class="weui-cells vux-search_show lb-cells"
      :class="{ topCell: topCell, 'left-animater': leftAnimater && !topCell }"
    >
      <div>
        <div
          class="weui-cell weui-cell_access"
          v-for="(item, index) in results"
          :key="index"
          @click="cellClick(index)"
        >
          <div class="weui-cell__bd weui-cell_primary">
            <span class="radius" :class="{ select: item.select }"></span>
            <p>{{ item.title }}</p>
            <div class="cell-text">{{ item.otherData }}</div>
          </div>
        </div>
      </div>
      <div>
        <span class="iconfont" @click="backBtn">&#xe635;</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex"; //先要引入
import Search from "vux/src/components/search";
import BHead from "@/components/base/B-Head";
import BMap from "BMap";
import { _debounce } from "@/utils/public";

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
      results: [
        {
          title: `惠州电信大楼`,
          otherData: `广东省惠州市惠城区云山西路与惠州大道交叉处XXXX 0`,
          select: true
        },
        {
          title: `佳兆业广场`,
          otherData: `广东省惠州市惠城区云山西路与惠州大道交叉处XXXX 0`
        },
        {
          title: `佳兆业广场`,
          otherData: `广东省惠州市惠城区云山西路与惠州大道交叉处XXXX 0`
        }
      ],
      index: 0,
      topCell: false,
      leftAnimater: false
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
    console.log(this.$route.params.data);
  },
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
    },
    resultClick(item) {
      console.log("you click the result item: " + JSON.stringify(item));
    },
    // 改变场数
    changefield: _debounce(function(value) {
      // do something ...
      const self = this;
      this.index++;
      this.results = [];
      this.topCell = true;
      this.results.push({
        title: `${value} ${self.index + 1}期 `,
        otherData: `广东省惠州市惠城区云山西路与惠州大道交叉处XXXX ${self.index +
          1} `
      });
      this.results.push({
        title: `${value} ${self.index + 1}期 `,
        otherData: `广东省广州市天河区科韵路中三大道交叉处XX ${self.index + 1} `
      });
    }, 400),
    cellClick(i) {
      if (this.topCell) {
        this.results[i].select = true;
        this.topCell = false;
        this.leftAnimater = false;
      } else {
        this.leftAnimater = true;
      }
    },
    backBtn() {
      this.leftAnimater = false;
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
    border-bottom: none;
  }
  .allmap {
    height: 80%;
  }
  .lb-search {
    position: relative;
    width: 100%;
    height: 100px;
    padding: 10px 0;
    color: $font-color-theme;
    background-color: $background-color-theme;
  }
  .allmap {
    position: absolute !important;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .radius {
    position: absolute;
    left: 30px;
    top: 50px;
    width: 22px;
    height: 22px;
    border-radius: 11px;
    border: 6px solid $font-color-shallow9;
    background-color: $background-color-theme;
  }
  .radius.select {
    border: none;
    background-color: none;
    background: url(../../assets/images/location-icon.png) no-repeat center;
    background-size: 100%;
    height: 30px;
    width: 20px;
  }
  .cell-text {
    color: $font-color-shallow9;
    font-size: $font_little;
    padding-right: 20px;
    width: 100%;
    padding-bottom: 20px;
    border-bottom: 1px solid $border-color-theme;
  }
  .weui-cells.vux-search_show.lb-cells {
    & > div {
      width: 50%;
      float: left;
    }
    & > div:nth-child(2) {
      padding: 20px;
      .iconfont {
        margin-left: 10px;
        color: $font-color-shallow9;
        font-size: $font_large_s;
        display: block;
      }
    }
  }
  .weui-cells.vux-search_show.lb-cells.topCell {
    & > div {
      width: 100%;
    }
    & > div:nth-child(2) {
      display: none;
    }
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
    border: none;
  }

  .lb-search * {
    border: none !important;
  }
  *:after {
    border: none !important;
    border-bottom: none;
  }
  *:before {
    border: none !important;
    border-top: none;
  }
  .weui-cells.vux-search_show {
    display: none;
  }
  .weui-cells.vux-search_show.lb-cells {
    display: block;
    max-height: 600px;
    overflow-y: scroll;
    position: absolute;
    width: 200%;
    bottom: 0;
    left: 0;
    padding-top: 20px;
    transition: left 0.4s;
    -moz-transition: left 0.4s; /* Firefox 4 */
    -webkit-transition: left 0.4s; /* Safari 和 Chrome */
    -o-transition: left 0.4s; /* Opera */
  }
  .weui-cells.vux-search_show.topCell {
    position: relative;
    width: 100%;
  }
  .weui-cells.vux-search_show.left-animater {
    left: -100%;
  }
  .weui-search-bar__form {
    background-color: #eef2f5;
  }
  .weui-search-bar.weui-search-bar_focusing .weui-search-bar__cancel-btn {
    display: none;
  }
  .weui-search-bar__box .weui-icon-search {
    left: 70px;
    font-size: 32px;
    color: $font-color-theme;
    top: 30px;
  }
  .weui-search-bar__box .weui-search-bar__input {
    background-color: #eef2f5;
    height: 68px;
    border-radius: 39px;
    padding-left: 90px;
    width: 580px;
    font-size: $font_medium_s;
  }
  .weui-search-bar__box {
    padding-left: 0;
    padding-right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .weui-search-bar__label {
    display: none;
  }
  .weui-cells.vux-search_show .weui-cell {
    padding-left: 80px;
    display: block;
    position: relative;
  }
  .weui-cells.vux-search_show .weui-cell:last-child {
    margin-bottom: 20px;
  }
}
</style>
