<template>
  <div class="call-record">
    <b-head :title="title"></b-head>
    <v-scroll-full
      ref="myscrollfull"
      @load="loadData"
      class="scroll-top"
      v-infinite-scroll="loadMores"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="30"
    >
      <div class="list">
        <div
          class="item"
          v-for="(item, index) in lists"
          :key="index"
        >
          <div class="top">
            <div class="img">
              <span class="iconfont icon-huchu img_icon_blue" v-if="item.callingPhone"></span>
              <span class="iconfont icon-tonghua img_icon_blue" v-if="item.calledPhone&&!item.callingPhone"></span>
              <span class="iconfont icon-weijiedianhua img_icon_grey" v-if="item.STATUS!=0"></span>
            </div>
            <div class="container">
              <div class="left item_commom">
                <span>{{ changeDate('Y-M-D h:m',item.startTime) || '未知'}}</span>
                <span class="item2">{{ item.callingPhone || item.calledPhone|| '未知' }}</span>
              </div>
              <div class="right item_commom1">
                <div class="more1">
                  <span>通话时长：{{ callTime(item.startTime,item.endTime) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-scroll-full>
    <float-btn text='生成服务单' @onFloatBtnClicked="floatClick" />
  </div>
</template>
<script>
// import Tab from "vux/src/components/tab";
// import TabItem from "vux/src/components/tab/tab-item";
// import { Tab, TabItem } from "vux";
// import { XButton } from "vux";
import BHead from "@/components/base/B-Head";
import FloatBtn from "@/components/dragBox/floatBtn";
import  { listSearchMixin } from "@/mixin";
import {api4} from "@/api/api"
import {formatDate,calculateTime} from '@/utils/public.js'
import VScrollFull from "@/components/mescroll/downScroll";

export default {
  mixins: [listSearchMixin],
  components: {
    BHead,
    FloatBtn,
    VScrollFull
    // Tab,
    // TabItem,
    // XButton
  },
  data: function() {
    return {
      title: "",
      lists: [],
      repairoperId: '',
      repairoperPhone: '',
      custId: '',
      pageNum: 1,
      rows: 8,
      total: null
    };
  },
  created() {
    this.repairoperId = this.$route.params.repairoperId;
    this.title = this.$route.params.repairoperName;
    this.custId = this.$route.params.custId;
    this.getCallDetail();
  },
  mounted() {
    // this.alertShow();
  },
  methods: {
    // 点击浮动窗事件
    floatClick() {
      this.$router.push({
        name: "generatingOrders",
        params: {
          repairoperId: this.repairoperId,
          repairoperPhone: this.repairoperPhone
        }
      });
    },
    getCallDetail() {
      let params = {
        method: 'GET',
        url: api4.engineerCallDetail,
        data: {
          repairoperId: this.repairoperId,
          custId: this.custId,
          page: this.pageNum,
          rows: this.rows
        }
      }
      this.sendReq(params, res => {
        this.$nextTick(() => {
          this.$refs.myscrollfull.mescroll.endSuccess();
        });
        if(res.respHeader.resultCode == 0) {
          let resResult = res.respBody;
          this.lists = this.lists.concat(resResult.callList);
          this.total = resResult.total;
        }
      })
    },
    loadData() {
      this.pageNum = 1;
      this.lists = [];
      this.getCallDetail();
    },
    loadMores() {
      let currTotal = this.pageNum * this.rows;
      if(currTotal < this.totalNum) {
        this.pageNum ++;
        this.getCallDetail();
      }
    },
    //改变时间格式
    changeDate(format, time) {
      return formatDate(format, time);
    },
    //计算通话时长
    callTime(timeS,timeE) {
      return calculateTime(timeS,timeE)
    },
  }
};
</script>

<style lang="scss" scoped="">
@import "@/assets/scss/base.scss"; /*引入配置*/
.call-record {
  background: $background-color-themesec;
  height: 100%;
  padding: 18px 14px 0 14px;
  .list {
    // background: $background-color-theme;
    margin-top: 100px;
    .item {
      //   margin: 15px;
      border-radius: 5px;
      padding: 42px 30px 38px 22px;
      margin-bottom: 9px;
      background: $background-color-theme;
      .top {
        display: flex;
        align-items: center;
        .img {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 26px;
          height: 27px;
          background: $background-color-theme;

          margin-right: 16px;
          .img_icon_blue {
            color: #4487F6;
          }
          .img_icon_grey {
            color: #999;
          }
        }
        .container {
          font-size: 32px;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: $font-color-themesec;
          display: flex;
          justify-content: space-between;
          width: 100%;
          .item_commom1 {
            flex-direction: row;
            display: flex;
            align-items: center;
            .more1 {
              flex-direction: column;
              display: flex;
            }
            .more2 {
              width: 42px;
              height: 42px;
              margin-left: 12px;
            }
          }
          .item_commom {
            display: flex;
            flex-direction: column;

            .item2 {
              margin-top: 20px;
            }
            .ansower {
              color: #999999;
              text-align: right;
            }
          }
        }
      }
      .bottom {
        margin-top: 21px;
        color: $background-color-theme;
        font-size: 26px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .commite1 {
          width: 100px;
          height: 44px;
          line-height: 44px;
          background: $background-color-theme1;
          border-radius: 6px;
        }
        .commite2 {
          width: 133px;
          line-height: 44px;
          height: 44px;
          background: $background-color-theme1;
          border-radius: 6px;
          margin-left: 28px;
        }
      }
    }
  }
}
</style>
