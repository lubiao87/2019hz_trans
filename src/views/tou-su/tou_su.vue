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
          <div class="list" v-for="(item, index) in complainLists" :key="index + 'jw'">
            <div class="user-name">
              <div class="title">用户名称</div>
              <div class="txt">{{ item.custId }}</div>
            </div>
            <div class="odd-number">
              <div class="title">投诉单号</div>
              <div class="txt">{{ item.complainId }}</div>
            </div>
            <div class="complaint-details">
              <div class="title">投诉内容</div>
              <div class="txt">{{ item.content }}</div>
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
      page: 1, //页数
      rows: 5, //数量
      busy: true,
      flag: false,

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
      ],
      complainLists: []
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

      
        this.page++;
        that.evaluteList(true);
        
     
    },
    evaluteList() {
      const self = this;

      let params = {
        method: "get",
        url:
          api.getLists +
          "?custId=" +
          "testId" +
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
        if (res.respHeader.resultCode == 0) {
          // let respBody = res.respBody;
          // let complainList = res.respBody.complainList;
          if (this.flag) {
            this.complainLists = this.complainLists.concat( res.respBody.complainList); //concat数组串联进行合并
            if (this.complainLists.length>=res.respBody.total) {
              //如果数据加载完 那么禁用滚动时间 this.busy设置为true
              // console.log("res.result.count" + res.result.count);
              // console.log(this.goodsList);
              this.busy = true;
              console.log("this.busy:" + this.busy);
            } else {
              this.busy = false;
              console.log("res.result.count" + res.result.count);
            }
          }else{//第一次进入页面 完全不需要数据拼接的
          console.log('000')
						this.complainLists= res.respBody.complainList;
            this.busy=false;
            	this.flag=true;
					}

        }
      });
    },
    onTabClick(link) {
      this.page = 1;
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
      // padding: 60px 0;
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
