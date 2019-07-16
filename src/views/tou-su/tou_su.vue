<template>
  <div class="tou-su">
    <b-head :showBack="true" :title="title"></b-head>
    <div class="content">
      <tab :line-width="0">
        <tab-item
          active-class="active-1"
          @on-item-click="onTabClick('处理中')"
          selected
          >处理中</tab-item
        >
        <tab-item active-class="active-1" @on-item-click="onTabClick('待评价')"
          >待评价</tab-item
        >
        <tab-item active-class="active-1" @on-item-click="onTabClick('已完成')"
          >已完成</tab-item
        >
      </tab>
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
</template>
<script>
// import Tab from "vux/src/components/tab";
// import TabItem from "vux/src/components/tab/tab-item";
import { Tab, TabItem } from "vux";
import BHead from "@/components/base/B-Head";

export default {
  components: {
    BHead,
    Tab,
    TabItem
    // Grid
  },
  data: function() {
    return {
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
        }
      ]
    };
  },
  created() {},
  mounted() {
    // this.alertShow();
  },
  methods: {
    onTabClick(link) {
      this.tableName = link;
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
