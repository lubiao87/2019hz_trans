<template>
  <div class="search-result">
    <b-head :showBack="true" :title="title"></b-head>
    <div class="content">
      <div class="content-in">
        <div class="logo-box">
          <img src="../../assets/images/searchResult.png" alt="搜索结果" />
          <div class="text">查询结束</div>
        </div>

        <acc-search :datas="datas"></acc-search>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex"; //先要引入
import BHead from "@/components/base/B-Head";
import AccSearch from "@/views/look-engineer/ACCSearchEngineer";
import { listSearchMixin } from "@/mixin";
import { api } from "@/api/api";
export default {
  mixins: [listSearchMixin],
  components: {
    BHead,
    AccSearch
  },
  data: function() {
    return {
      title: "我要找工程师",
      colorChange: false,
      items: {
        productName: Math.random(),
        price: new Date().getTime()
      },
      showBack: false,
      datas: []
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
    engineerList() {
      console.log("111");
      const self = this;
      let params = {
        url:
          api.findenginnerByOtherCode +
          "?phone=" +
          self.data.valuePhone +
          "&card=" +
          self.data.code
      };
      console.log(params);
      self.sendReq(params, res => {
        console.log(res);
        if (res.respHeader.resultCode == 0) {
          console.log("000");
          let datas = res.respBody.data;
          let arr = [];
          datas.map((item, index) => {
            arr.push(item.enginner);
            item.enginner = arr;
            item.enginner[0].src = item.enginner[0].repairoperPhoto;
            item.enginner[0].title = item.enginner[0].repairoperName;
            item.enginner[0].desc = item.enginner[0].branchName;
            item.enginner[0].id = item.enginner[0].id;
          });
          console.log(arr);
          console.log(datas);
          self.datas = datas;
        }
      });
    }
  },
  mounted() {
    this.data = this.$route.params;
    console.log(this.data);
    this.engineerList();
    // console.log(this.$store.state);
  }
};
</script>
<style lang="scss" scoped="">
@import "@/assets/scss/base.scss"; /*引入配置*/
.search-result {
  // .engineer-list{

  // }
  .base-box {
    position: relative;
  }
  .content {
    padding: 25px;
    background-color: $background-color-themesec;
    height: 100%;
    .content-in {
      background-color: $background-color-theme;
      border-radius: 10px;
      .logo-box {
        padding-top: 20px;
        margin: auto;
        width: 140px;
        text-align: center;
        img {
          width: 74%;
        }
        .text {
          margin-top: 20px;
        }
      }
    }
  }
}
</style>
<style lang="scss">
@import "@/assets/scss/base.scss"; /*引入配置*/
.search-result {
  .content {
    .content-in {
      .acc-search {
        .title {
          display: none;
        }
        & > .stip {
          display: none;
        }
      }
    }
  }
}
</style>
