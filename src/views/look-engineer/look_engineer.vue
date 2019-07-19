<template>
  <div class="look-engineer">
    <b-head :showBack="true" :title="title"></b-head>
    <tab :line-width="0" custom-bar-width="60px">
      <tab-item
        v-for="(item, index) in tabList"
        :key="index + 'ga'"
        active-class="active-1"
        @on-item-click="onTabClick(item.topX)"
        :selected="item.selected"
        >{{ item.name }}</tab-item
      >
    </tab>
    <!-- <div> -->
    <!-- <div class="gray-bg"></div> -->
    <div
      ref="myscrollfull"
      @load="loadData"
      class="scroll-top content"
      v-infinite-scroll="loadMores"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="3000"
    >
      <div class="router-box" ref="routerBox1">
        <!-- <component
            v-bind:is="viewsName"
            :key="viewsName"
            @childrenData="getChildData"
          ></component> -->
        <map-area></map-area>
      </div>
      <div class="router-box" ref="routerBox2">
        <acc-search></acc-search>
      </div>
      <div class="router-box">
        <other-search @childrenData="getChildData"></other-search>
      </div>
      <codeInput :showFlag="showInputBox" @childrenData="getChildData" />
    </div>
    <!-- </div> -->
  </div>
</template>
<script>
// import Tab from "vux/src/components/tab";
// import TabItem from "vux/src/components/tab/tab-item";
import { Tab, TabItem } from "vux";
import BHead from "@/components/base/B-Head";
import mapArea from "@/views/look-engineer/mapArea.vue";
import accSearch from "@/views/look-engineer/ACCSearch.vue";
import otherSearch from "@/views/look-engineer/otherSearch.vue";
import CodeInput from "@/components/codeInput/codeInput";
// import VScrollFull from "@/components/mescroll/downScroll";
export default {
  components: {
    BHead,
    Tab,
    TabItem,
    mapArea,
    accSearch,
    otherSearch,
    CodeInput
    // Grid
  },
  data: function() {
    return {
      title: "我要找工程师",
      viewsName: "mapArea",
      showInputBox: false,
      scrollTop: 0,
      tabList: [
        {
          name: "区域查询",
          viewsName: "mapArea",
          selected: true,
          topX: 0
        },
        {
          name: "绑定账号查询",
          viewsName: "accSearch",
          selected: false,
          topX: 442
        },
        {
          name: "其他方式查询",
          viewsName: "otherSearch",
          selected: false,
          topX: 820
        }
      ],
      heightBox1: 0
    };
  },
  created() {},
  mounted() {
    // this.alertShow();
    this.$nextTick(() => {
      this.heightBox1 = this.$refs.routerBox1.offsetHeight;
      this.heightBox2 = this.$refs.routerBox2.offsetHeight;
      this.tabList[0].topX = 0;
      this.tabList[1].topX = this.heightBox1;
      this.tabList[2].topX = this.heightBox1 + this.heightBox2;

      // console.log(this.$refs.routerBox1.offsetHeight);
    });
  },
  methods: {
    onTabClick(value) {
      console.log(value);
      this.$refs.myscrollfull.scrollTop = value;
    },
    getChildData(data) {
      // console.log(data);
      this.showInputBox = data.showInputBox;
      if (data.routerLink) {
        this.$router.push({ name: data.routerLink, params: { data: "item" } });
      }
    },
    loadMores() {
      this.scrollTop = this.$refs.myscrollfull.scrollTop;
    },
    loadData(e) {
      console.log(e);
    },
    setTabNull() {
      this.tabList.forEach((item, index) => {
        this.tabList[index].selected = false;
      });
    }
  },
  watch: {
    scrollTop(value) {
      const h12 = this.heightBox1 + 200;
      const h21 = this.heightBox1 + this.heightBox2;
      const h22 = this.heightBox1 + this.heightBox2 + 50;
      if (value >= 0 && value <= 100) {
        this.setTabNull();
        this.tabList[0].selected = true;
      } else if (value >= this.heightBox1 && value <= h12) {
        this.setTabNull();
        this.tabList[1].selected = true;
      } else if (value >= h21 && value <= h22) {
        this.setTabNull();
        this.tabList[2].selected = true;
      }
    }
  }
};
</script>

<!--Add"scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="">
@import "@/assets/scss/base.scss"; /*引入配置*/
.look-engineer {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .vux-tab {
    .active-1 {
      color: $font-color-shallow3;
      font-size: $font_medium_s;
    }
  }
  .content {
    top: 160px;
    position: fixed;
    height: 1000px;
    overflow: scroll;
    transition: all 0.4s;
    -moz-transition: all 0.4s; /* Firefox 4 */
    -webkit-transition: all 0.4s; /* Safari 和 Chrome */
    -o-transition: all 0.4s; /* Opera */
    width: 100%;
    .router-box {
      background-color: $background-color-themesec;
      width: 100%;
      padding: 30px 30px 0;
      // height: 740px;
    }
    .router-box:nth-child(3) {
      padding-bottom: 700px;
    }
  }
}
</style>
<style lang="scss">
@import "@/assets/scss/base.scss"; /*引入配置*/
.look-engineer {
  .vux-tab-wrap {
    position: fixed;
    top: 100px;
    left: 0;
    width: 100%;
    z-index: 998;
    // overflow: hidden;
  }
  .vux-tab-container {
    height: 100%;
    .vux-tab {
      height: 48px;
      overflow: hidden;
      .vux-tab-item {
        height: 50px;
      }
    }
  }
  .vux-tab-item {
    position: relative;
  }
  .vux-tab-item::after {
    position: absolute;
    right: 0;
    top: 19%;
    content: "";
    height: 60%;
    width: 0;
    display: block;
    border: none !important;
    border-right: 1px solid $border-color-theme !important;
  }
  .vux-tab-item:nth-child(3):after {
    border-right: 1px solid transparent !important;
  }
  .base-box {
    border-bottom: none;
  }
}
body .vux-tab .vux-tab-item {
  color: #6e7280;
  font-size: 28px;
}
</style>
