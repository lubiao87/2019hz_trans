<template>
  <div class="complaint-state">
    <!-- <b-head :title="title"></b-head> -->
    <!-- <scroll ref="scrollList" class="scroll_list"> -->
    <div class="main_content">
      <div style="width: 100%;position: relative;background-color: #fff;">
        <div class="lb-process">
          <div class="lb-list">
            <div class="lb-process-title">
              <div class="left-date">05-21 10:49</div>
              <div class="right-data">
                已完成
                <div class="lb-process-data">
                  <div>感谢您的投诉和建议</div>
                </div>
              </div>
              <div class="line" :class="{ green: data.status > 1 }"></div>
              <div class="radius" :class="{ green: data.status > 0 }">
                <img src="../../assets/images/completed.png" alt="已完成" />
              </div>
            </div>
          </div>
          <div class="lb-list">
            <div class="lb-process-title">
              <div class="left-date">05-21 10:49</div>
              <div class="right-data">
                待评价
                <div class="lb-process-data">
                  <div>请对我们的服务做出评价,谢谢!</div>
                </div>
              </div>
              <div class="line" :class="{ green: data.status > 1 }"></div>
              <div class="radius" :class="{ green: data.status > 0 }">
                <img src="../../assets/images/evaluated.png" alt="已完成" />
              </div>
            </div>
          </div>
          <div class="lb-list">
            <div class="lb-process-title">
              <div class="left-date">05-21 10:49</div>
              <div class="right-data">
                处理中
                <div class="lb-process-data">
                  <div>您反馈的问题已处理</div>
                  <div class="img-box">
                    <img src="../../assets/images/searchResult.png" alt="" />
                    <img src="../../assets/images/searchResult.png" alt="" />
                    <img src="../../assets/images/searchResult.png" alt="" />
                  </div>
                </div>
              </div>
              <div class="line" :class="{ green: data.status > 1 }"></div>
              <div class="radius" :class="{ green: data.status > 0 }">
                <img src="../../assets/images/processing.png" alt="已完成" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- </scroll> -->
  </div>
</template>

<script>
// import BHead from "@/components/base/B-Head";
// import Scroll from '@/components/scroll/scroll'
import { listSearchMixin } from "@/mixin";
// import { Flow, FlowState, FlowLine } from "vux";
// import { api } from "@/api";

export default {
  mixins: [listSearchMixin],

  data() {
    return {
      title: "故障单详情",
      searchList: [],
      showClear: false,
      id: null,
      data: {
        status: 2 // 状态码
      }
    };
  },
  mounted() {
    // this.id = this.$route.params.data.id
    // this.id = sessionStorage.getItem('id')
    // this.getDataList()
  },
  methods: {}
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/base.scss"; /*引入配置*/
.complaint-state {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 610px;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  background-color: $background-color-theme;
  .lb-flow {
    height: 1020px;
    width: 30px;
    position: absolute;
    left: 0;
    top: 0;
  }
  .order-btn {
    color: $font-color-theme2;
  }
  .lb-process {
    width: 100%;
    padding: 30px 40px;
    padding-top: 40px;
    .lb-list {
      .radius {
        width: 46px;
        height: 46px;
        // line-height: 46px;
        padding: 4px;
        border: 1px solid $border-color-theme;
        background: $background-color-themesec;
        border-radius: 50%;
        position: absolute;
        left: 100px;
        top: 10px;
        img {
          width: 60%;
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          margin: auto;
        }
      }
      .line {
        position: absolute;
        left: 120px;
        top: 0px;
        height: 100%;
        width: 6px;
        padding: 0px !important;
        background: $background-color-themesec;
      }
      .lb-process-title {
        font-size: 32px;
        // font-weight: bold;
        color: $font-color-shallow3;
        position: relative;
        z-index: 2;
        overflow: hidden;
        .left-date {
          width: 100px;
          float: left;
          color: $font-color-shallow9;
        }
        .right-data {
          float: left;
          margin-left: 100px;
        }
      }
      .lb-process-data {
        font-size: 28px;
        color: $font-color-shallow6;
        padding-top: 10px;
        position: relative;
        min-height: 120px;
        .img-box {
          margin-top: 20px;
          width: 100%;
          overflow: hidden;
          img {
            width: 100px;
            margin-right: 20px;
            float: left;
          }
        }
      }
    }
    .lb-list:nth-child(1) {
      .line {
        top: 20px;
      }
    }
  }
}
</style>
