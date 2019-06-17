<template>
  <div :id="refName" class="mescroll" :ref="refName">
    <div :class="emptyCls" v-show="showEmptySlot">
      <slot name="empty"></slot>
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
import MeScroll from "mescroll.js";
import "mescroll.js/mescroll.min.css";
export default {
  props: {
    pageSize: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      showEmptySlot: false,
      refName: "mescroll_" + Date.now(),
      mescroll: null
    };
  },
  computed: {
    emptyCls() {
      return this.refName + "_empty";
    }
  },
  mounted() {
    this.$nextTick(this.$_init());
  },
  methods: {
    $_init() {
      this.showEmptySlot = false;
      if (this.mescroll) this.mescroll.destroy();
      this.mescroll = new MeScroll(this.refName, {
        down: {
          use: true,
          auto: false, // 默认不执行下拉刷新的回调
          callback: this.$_upCallback,
          offset: 100
        },
        up: {
          callback: null,
          use: false,
          isBounce: false,
          page: {
            num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
            size: 10 //每页数据条数,默认10
          },
          noMoreSize: 5 //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;
        }
      });
      let _this = this;
      this.mescroll.showEmpty = function() {
        _this.showEmptySlot = true;
      };
      this.mescroll.removeEmpty = function() {
        _this.showEmptySlot = false;
      };
    },
    // 上拉回调
    $_upCallback(page) {
      this.$emit("load", page.num);
    },
    getInstance() {
      return this.mescroll;
    },
    endByPage(curPagelen, totalPage) {
      this.mescroll && this.mescroll.endByPage(curPagelen, totalPage);
    }
  }
};
</script>
