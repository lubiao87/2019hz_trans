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
      >{{ item.name }}</tab-item>
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
        <map-area :datasMap="datasMap"></map-area>
      </div>
      <div class="router-box" ref="routerBox2">
        <acc-search :datasAccount="datasAccount"></acc-search>
      </div>
      <div class="router-box">
        <other-search @childrenData="getChildData1"></other-search>
      </div>
      <codeInput :showFlag="showInputBox" @childrenData2="getChildData2" />
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
import { listSearchMixin } from "@/mixin";
import { api3, api } from "@/api/api";
// import VScrollFull from "@/components/mescroll/downScroll";
export default {
  mixins: [listSearchMixin],
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
      datasMap: [],
      datasAccount:[],
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
      heightBox1: 0,
    };
  },
  created() {},
  mounted() {
    // this.alertShow();
    this.engineerNum();
    this.engineerIndex();

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
    engineerIndex() {
      console.log("111");
      const self = this;
      let params = {
        url:
          api3.findenginnerByLAL +
          "?longitude=" +
          "2829711" +
          "&latitude=" +
          "123456"
      };
      // let params = {
      //   url: api.findenginnerByOtherCode,
      //   data: {
      //     longitude: "2829711",
      //     latitude: "123456"
      //   }
      // };
      console.log(params);
      self.sendReq(params, res => {
        console.log(res);
        if (res.respHeader.resultCode == 0) {
          console.log("000");
          let datas = res.respBody.data;
          let arr = [];
          arr.push(datas);
          res.respBody.arr = arr;
          res.respBody.arr[0].src = datas.repairoperPhoto;
          res.respBody.arr[0].title = datas.repairoperName;
          res.respBody.arr[0].desc = datas.branchName;
          res.respBody.arr[0].id = datas.id;
          console.log("888");
          console.log(arr);
          console.log(res.respBody.arr);
          self.datasMap = res.respBody.arr;
        }
      });
    },
    engineerNum() {
      console.log("111");
      const self = this;
      let params = {
        method: "get",
        url: api.findenginnerByBdCode
      };

      console.log(params);
      self.sendReq(params, res => {
        console.log(res);
        if (res.respHeader.resultCode == 0) {
          console.log(res);
          if (res.respHeader.resultCode == 0) {
            console.log("000");
            let datas = res.respBody.data;
            let arr = [];
            datas.map((item, index) => {
              item.accDetail.idx='0'+index;
              arr.push(item.enginner);
              item.enginner = arr;
              item.enginner[0].src = item.enginner[0].repairoperPhoto;
              item.enginner[0].title = item.enginner[0].repairoperName;
              item.enginner[0].desc = item.enginner[0].branchName;
              item.enginner[0].id = item.enginner[0].id;
            });
            console.log(8910);
            console.log(datas);
            self.datasAccount = datas;
          }
        }
      });
    },
    getChildData1(data) {
      console.log(789);
      this.valuePhone = data.valuePhone;
      this.showInputBox = data.showInputBox;
    },
    //  getChildData2(data){
    //     console.log(data)
    // },
    getChildData2(data) {
      data.code = data.code.toString().replace(/,/g, "");
      data.valuePhone = this.valuePhone;
      console.log(data);
      if (data.routerLink) {
        this.$router.push({ name: data.routerLink, params: data });
      }
      // this.state = 2;
      // const self = this;
      // console.log("onConfirm5");
      // let params = {
      //   method: "post",
      //   url: api.findenginnerByOtherCode,
      //   data: {
      //     phone: this.valuePhone,
      //     card: this.code
      //   }
      // };
      // console.log(params.data);
      // self.sendReq(params, res => {
      //   // console.log(res);
      //   // if (res.respHeader.resultCode == 0) {
      //   //   let respBody=res.respBody.complainDetail;
      //   //   let picPaths=res.respBody.picPaths
      //   //   self.menuList[0].value = respBody.complainId;
      //   //   self.menuList[1].value = respBody.type;
      //   //   self.menuList[2].value =respBody.custname;
      //   //   self.menuList[3].value = respBody.linkname;
      //   //   self.menuList[4].value = respBody.linkphone;
      //   //   self.receves =respBody.content;
      //   //   self.status =respBody.status;
      //   //   self.imgs =picPaths;
      //   //   picPaths
      //   //   console.log( self.imgs)
      //   // }
      // });
    },
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
  },
  beforeRouteEnter(to,from,next) {
    if(from.name == "quickReport") {
      next(vm => {
        localStorage.setItem('enginerrCanRoute',JSON.stringify(false));
      })
    }else {
      next(vm => {
        localStorage.setItem('enginerrCanRoute',JSON.stringify(true));
      })
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
