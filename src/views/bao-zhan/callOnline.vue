<template>
  <div class="callOnline">
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
          @click="lookDetails(item)"
        >
          <div class="top">
            <div class="img">
              <span class="iconfont icon-huchu img_icon_blue" v-if="item.callingPhone"></span>
              <span class="iconfont icon-tonghua img_icon_blue" v-if="item.calledPhone&&!item.callingPhone"></span>
              <span class="iconfont icon-weijiedianhua img_icon_grey" v-if="item.STATUS!=0"></span>
            </div>
            <div class="container">
              <div class="left item_commom">
                <span>{{ item.repairoperName }}</span>
                <span class="item2" :class="{'redColor':item.status==1}">{{ item.callingPhone || item.calledPhone|| '未知' }}</span>
              </div>
              <div class="right item_commom1">
                <div class="more1">
                  <span>{{ changeDate('Y-M-D h:m',item.startTime) || '未知'}}</span>
                  <span class="item2 ansower">通话时长：{{ callTime(item.startTime,item.endTime) }}</span>
                </div>
                <img class="more2" src="img/turn_right.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-scroll-full>
  </div>
</template>
<script>
// import Tab from "vux/src/components/tab";
// import TabItem from "vux/src/components/tab/tab-item";
// import { Tab, TabItem } from "vux";
// import { XButton } from "vux";
import  { listSearchMixin } from "@/mixin";
import {api4} from "@/api/api"
import {formatDate,calculateTime} from '@/utils/public.js'
import VScrollFull from "@/components/mescroll/downScroll";

export default {
  mixins: [listSearchMixin],
  components: {
    VScrollFull
    // Tab,
    // TabItem,
    // XButton
  },
  data: function() {
    return {
      lists: [
        // {
        //   repairoperName: "苏大强",
        //   startTime: "6月11日 17:30",
        //   callingPhone: "13332147878",
        //   TaklTime: "通话时长：30:25"
        // },
        // {
        //   repairoperName: "苏小强",
        //   startTime: "6月11日 17:30",
        //   calledPhone: "13332147878",
        //   TaklTime: "通话时长：30:25"
        // }
      ],
      userId: '5456',
      totalNum: '',
      pageNum: 1,
      rows: 8
    };
  },
  created() {
    this.getCallLists();
  },
  mounted() {
    // this.alertShow();
  },
  methods: {
    lookDetails(item) {
      this.$router.push({
        name: "callRecord",
        params: {
          repairoperId: item.repairoperId,
          custId: item.custId,
          repairoperName: item.repairoperName
        }
      });
    },
    getCallLists() {
      let params = {
        method: 'GET',
        url: api4.callListByCustId,
        data: {
          custId: this.userId,
          page: this.pageNum,
          rows: this.rows
        }
      };
      this.sendReq(params, res => {
        console.log(res)
        if(res.respHeader.resultCode == 0) {
          let resData = res.respBody;
          this.lists = this.lists.concat(resData.callList);
          this.totalNum = resData.total;
        }
        //数据渲染成功后,隐藏下拉刷新的状态
        this.$nextTick(() => {
          this.$refs.myscrollfull.mescroll.endSuccess();
        });
      })
    },
    //改变时间格式
    changeDate(format, time) {
      return formatDate(format, time);
    },
    //计算通话时长
    callTime(timeS,timeE) {
      return calculateTime(timeS,timeE)
    },
    loadData() {
      this.pageNum = 1;
      this.lists = [];
      this.getCallLists();
    },
    loadMores() {
      let currTotal = this.pageNum * this.rows;
      console.log(currTotal)
      if(currTotal < this.totalNum) {
        this.pageNum ++;
        this.getCallLists();
      }
    },
  }
};
</script>

<style lang="scss" scoped="">
@import "@/assets/scss/base.scss"; /*引入配置*/
.callOnline {
  background: $background-color-themesec;
  height: 100%;
  padding: 18px 14px 0 14px;
  // overflow-y: auto;
  .list {
    // background: $background-color-theme;
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
          font-size: $font_little;
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
              font-size: $font_little_s;
              span {
                padding-top: 10px;
              }
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
            .redColor {
              color: #ED4343;
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
