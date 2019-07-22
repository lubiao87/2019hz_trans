<template>
  <div class="tou-su">
    <b-head :showBack="true" :title="title"></b-head>
    <div class="content">
      <tab :line-width="0">
        <tab-item active-class="active-1" @on-item-click="onTabClick('0')" selected>处理中</tab-item>
        <tab-item active-class="active-1" @on-item-click="onTabClick('1')">待评价</tab-item>
        <tab-item active-class="active-1" @on-item-click="onTabClick('2')">已完成</tab-item>
      </tab>
      <div
        ref="myscrollfull"
        class="scroll-top"
        v-infinite-scroll="loadMores"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="30"
      >
        <div class="router-box">
          <div class="list" v-for="(item, index) in dataList" :key="index + 'jw'">
            <div class="user-name">
              <div class="title">用户名称</div>
              <div class="txt">{{ item.userName }}</div>
            </div>
            <div class="odd-number">
              <div class="title">投诉单号</div>
              <div class="txt">{{ item.accNumber }}</div>
            </div>
            <div class="complaint-details">
              <div class="title">投诉内容</div>
              <div class="txt">{{ item.contentComplaint }}</div>
            </div>
            <div class="ping-jia" v-if="tableName === '待评价'">
              <div class="btn">评价</div>
            </div>
          </div>
          <!-- <component v-bind:is="viewsName" :key="viewsName"></component> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import Tab from "vux/src/components/tab";
// import TabItem from "vux/src/components/tab/tab-item";
import { Tab, TabItem } from "vux";
import BHead from "@/components/base/B-Head";
import { listSearchMixin } from "@/mixin";
import { api } from "@/api/api";
import VScrollFull from "@/components/mescroll/downScroll";

export default {
  mixins: [listSearchMixin],
  components: {
    VScrollFull,
    BHead,
    Tab,
    TabItem
    // Grid
  },
  data: function() {
    return {
      page: 1,
      rows: 5,

      status: 0,
      title: "我的投诉记录",
      tableName: "处理中",
      dataList: [
        {
          userName: "张宇",
          accNumber: "F201906101234",
          contentComplaint: "装维工程师服务态度不好"
        },
        {
          userName: "张宇",
          accNumber: "F201906101234",
          contentComplaint: "装维工程师服务态度不好"
        },
        {
          userName: "张宇",
          accNumber: "F201906101234",
          contentComplaint: "装维工程师服务态度不好"
        },
        {
          userName: "张宇",
          accNumber: "F201906101234",
          contentComplaint: "装维工程师服务态度不好"
        },
        {
          userName: "张宇",
          accNumber: "F201906101234",
          contentComplaint: "装维工程师服务态度不好"
        },
        {
          userName: "张宇",
          accNumber: "F201906101234",
          contentComplaint: "装维工程师服务态度不好"
        },
        {
          userName: "张宇",
          accNumber: "F201906101234",
          contentComplaint: "装维工程师服务态度不好"
        },
        {
          userName: "张宇",
          accNumber: "F201906101234",
          contentComplaint: "装维工程师服务态度不好"
        }
      ]
    };
  },
  created() {},
  mounted() {
    // this.alertShow();
    this.evaluteList();
  },
  methods: {
    loadMores: function() {
      let that = this;

      this.busy = true;

      setTimeout(() => {
        that.evaluteList();
        that.busy = false;
      }, 1000);
    },
    evaluteList() {
      const self = this;

      let params = {
        method: "get",
        url:
          api.getLists +
          "?custId=" +
          "T2019/07/04-2344" +
          "&status=" +
          this.status +
          "&page=" +
          this.page +
          "&rows=" +
          this.rows,
        data: {
          custId: "F201906101234",
          status: this.status
        }
      };
      self.sendReq(params, res => {
        console.log(res);
      });
    },
    onTabClick(link) {
      this.status = link;
      this.evaluteList();
    }
  }
};
</script>

<!--Add"scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "@/assets/scss/base.scss"; /*引入配置*/
.tou-su {
  .router-box {
    height: 100%;
    background-color: $background-color-themesec;
    padding: 20px;
    .list {
      background-color: $background-color-theme;
      margin-bottom: 20px;
      border-radius: 8px;
      & > div {
        overflow: hidden;
        & > div {
          height: 60px;
          line-height: 60px;
        }
        .title {
          margin-left: 30px;
          width: 140px;
          float: left;
          color: $font-color-shallow9;
        }
        .txt {
          float: left;
        }
      }
      .ping-jia {
        width: 100%;
        height: 60px;
        .btn {
          width: 100px;
          text-align: center;
          height: 44px;
          line-height: 44px;
          float: right;
          margin-right: 40px;
          background-color: $background-color-theme1;
          color: $font-color-theme1;
          border-radius: 8px;
        }
      }
    }
  }
  .vux-tab-container {
    height: 100% !important;
  }
  .vux-tab {
    height: 102px !important;
    padding: 15px 44px 26px 60px;
  }
  .vux-tab .vux-tab-item {
    width: 153px !important;
    height: 61px !important;
    line-height: 61px !important;
  }
  .base-box {
    position: relative;

    .head-title {
      color: #000 !important;
    }
  }
  .content {
    height: 100%;
    .active-1 {
      width: 153px;
      height: 61px;
      line-height: 61px;
      background: rgba(68, 135, 246, 1);
      border-radius: 30px;
      color: #fff !important;
    }
  }
}
</style>
<style lang="scss">
.tou-su {
  @import "@/assets/scss/base.scss"; /*引入配置*/
  font-size: $font_little;
  .base-box {
    border-bottom: 0.01333rem solid #fff;
  }
  .vux-tab-wrap {
    height: 102px;
    padding-top: 0;
  }
}
</style>
<style lang="scss" scoped>
.tou-su {
  @import "@/assets/scss/base.scss"; /*引入配置*/
  .content {
    background: #efeff4;
  }
}
</style>
