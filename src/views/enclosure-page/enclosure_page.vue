<template>
  <div class="enclosure-page">
    <b-head :showBack="showBack" :title="title"></b-head>
    <button-tab class="lb-tab">
      <button-tab-item
        :selected="tableName === '聊天记录'"
        @on-item-click="consoleIndex('聊天记录')"
        >聊天记录
      </button-tab-item>
      <button-tab-item
        :selected="tableName === '通话记录'"
        @on-item-click="consoleIndex('通话记录')"
        >通话记录
      </button-tab-item>
    </button-tab>
    <v-scroll-full
      v-show="tableName === '聊天记录'"
      ref="myscrollfull"
      @load="loadData"
      class="scroll-top"
      v-infinite-scroll="loadMores"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="30"
    >
      <div class="lb-group" ref="lbGroup">
        <div
          slot="content"
          class="box"
          v-for="(item, index) in chatList"
          :key="index"
        >
          <div
            class="lb-panel"
            v-if="item.name !== '服务单详情'"
            :class="{ myText: item.name === '用户1' }"
          >
            <div class="img-man">
              <div class="img"></div>
            </div>
            <div class="info">
              <div class="info-text">
                {{ item.text }}
                <div
                  :class="{
                    triangleLeft: item.name === '用户2',
                    triangleRgiht: item.name === '用户1'
                  }"
                ></div>
              </div>
            </div>
            <!-- <div class="info">{{item.name}} {{item.mobile}}</div> -->
            <!-- <x-button class="onButton" @click.native="onButtonClick(item.id)">删除</x-button> -->
          </div>
          <div class="evaluation-box" v-if="item.name === '服务单详情'">
            <div class="title-box">
              <span class="line"></span>
              <span class="text">已生成服务单</span>
              <span class="line"></span>
            </div>
            <div class="evaSheet-list" v-for="(list, i) in item.list" :key="i">
              <div class="name">{{ item.name }}</div>
              <div class="list">
                <panel
                  :list="item.list"
                  type="1"
                  @on-click-item="onevaSheetLook"
                ></panel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-scroll-full>
    <div class="call-box" v-show="tableName === '通话记录'">
      <div
        class="call-list vux-1px-b"
        v-for="(item, index) in callList"
        :key="index + 'cc'"
      >
        <span v-if="item.stateIcon === '接通'" class="iconfont connect"
          >&#xe6ec;</span
        >
        <span v-if="item.stateIcon === '未接听'" class="iconfont notConnect"
          >&#xe635;</span
        >
        <div class="date">{{ item.date }}</div>
        <div class="phone">{{ item.phone }}</div>
        <div class="talkTime"><span>通话时长：</span> {{ item.talkTime }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex"; //先要引入
import {
  Panel,
  ButtonTab,
  ButtonTabItem,
  TransferDomDirective as TransferDom
} from "vux";
import VScrollFull from "@/components/mescroll/downScroll";
import BHead from "@/components/base/B-Head";
// import FloatBtn from "@/components/dragBox/floatBtn";

export default {
  directives: {
    TransferDom
  },
  components: {
    BHead,
    VScrollFull,
    Panel,
    ButtonTab,
    ButtonTabItem
    // FloatBtn
  },
  data: function() {
    return {
      title: "李四",
      colorChange: false,
      showBack: true,
      inputVal: "",
      chatList: [
        {
          name: "服务单详情", // 评价单
          list: [
            {
              src: "./img/evaSheet.png",
              title: "",
              desc: "您有一张服务单待评价请点击进行评价>>>",
              id: 384
            }
          ]
        },
        {
          name: "用户1",
          gender: "man",
          text: "好的，我马上过去",
          time: "2019-6-10 14:33:08"
        },
        {
          name: "用户2",
          gender: "man",
          text: "佳都商务大厦801室",
          time: "2019-6-10 14:32:08"
        },
        {
          name: "用户1",
          gender: "man",
          text: "请提供您的装机地址",
          time: "2019-6-10 14:30:58"
        }
      ],
      pageSize: 1,
      results: [],
      msg: "",
      ID: null,
      animationTime: null,
      left: 0,
      top: 0,
      floatText: "生成服务单",
      callList: [
        {
          date: "6月11日 17:30",
          phone: 13332147878,
          talkTime: "30:25",
          stateIcon: "接通"
        },
        {
          date: "6月11日 17:25",
          phone: 13332147878,
          talkTime: "03:25",
          stateIcon: ""
        },
        {
          date: "6月11日 17:27",
          phone: 13332147878,
          talkTime: "02:25",
          stateIcon: "未接听"
        }
      ],
      tableName: "聊天记录"
    };
  },
  computed: {
    ...mapState({
      //这里的...是超引用，ES6的语法，意思是state里有多少属性值用户1可以在这里放多少属性值
      isShow: state => state.footerStatus.showFooter //注意这些与上面的区别就是state.footerStatus,
      // arrList: state => state.collection.collects
      //里面定义的showFooter是指footerStatus.js里state的showFooter
    }),
    ...mapGetters("collection", {
      //用mapGetters来获取collection.js里面的getters
      arrList: "renderCollects"
    })
  },
  created() {
    const self = this;
    this.ID = this.$route.params.data.id;
    this.animationTime = Date.now();
    console.log(this.$route.params.data.id);
    this.chatList = this.chatList.reverse(); // 假数据倒序，记得注释掉
    if ((this.ID = this.$route.params.data.name === "通话记录")) {
      this.tableName = "通话记录";
    }
  },
  methods: {
    // 点击浮动窗事件
    // floatClick() {
    //   // console.log("点击浮动窗");
    //   const self = this;
    //   this.$router.push({
    //     name: "generatingOrders",
    //     params: {
    //       data: self.floatText
    //     }
    //   });
    // },
    ...mapActions("collection", [
      //collection是指modules文件夹下的collection.js
      "invokePushItems" //collection.js文件中的actions里的方法，在上面的@click中执行并传入实参
    ]),
    // 上拉刷新
    loadData() {
      // console.log("可以上拉");
      const self = this;
      this.pageSize++;
      setTimeout(() => {
        // _this.list.push(pageIndex + '_')
        if (this.pageSize === 2) {
          self.chatList.unshift({
            name: "用户2",
            gender: "man",
            text: "你好，用户1家的网络可以连接，但是不 能上网？ ",
            time: "2019-6-10 14:30:36"
          });
        }

        self.chatList.unshift({
          name: "用户1",
          gender: "man",
          text: "洗了 ",
          time: "2019-6-10 14:30:36"
        });

        //数据渲染成功后,隐藏下拉刷新的状态
        this.$nextTick(() => {
          self.$refs.myscrollfull.mescroll.endSuccess(self.chatList.length);
          // self.$refs.myscrollfull.endByPage(self.chatList.length, 1);
        });
      }, 400);
    },
    loadMores() {
      console.log("下拉干嘛");
    },
    // 查看评价
    onevaSheetLook(item) {
      console.log(item);
      this.$router.push({
        name: "generatingOrders",
        params: {
          data: item
        }
      });
    },
    consoleIndex(tab) {
      this.tableName = tab;
    }
  },
  mounted() {
    this.$nextTick(() => {
      // console.log(this.$refs.myscrollfull);
      this.$refs.myscrollfull.mescroll.endSuccess(this.chatList.length);
      this.$refs.myscrollfull.mescroll.scrollTo(99999, 300); // 滚动到底部
    });
  },

  watch: {
    // $route(to, from) {
    //   console.log(to.name);
    //   this.$store.dispatch("footerStatus/showFooter"); //这里改为'footerStatus/showFooter',
    //   //意思是指footerStatus.js里actions里的showFooter方法
    // }
  },
  // 进入路由时,恢复列表状态
  beforeRouteEnter(to, from, next) {
    // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
    next(vm => {
      vm.animationTime = Date.now();
      // if (vm.websock) {
      //   vm.initWebSocket();
      // }
      if (vm.$refs.myscrollfull.mescroll) {
        vm.$refs.myscrollfull.mescroll.lastBounce =
          vm.$refs.myscrollfull.mescroll.optUp.isBounce; // 记录当前是否禁止ios回弹
        vm.$refs.myscrollfull.mescroll.setBounce(true); // 允许bounce
        vm.$refs.myscrollfull.mescroll.lastScrollTop = vm.lastScrollTop; // 记录当前滚动条的位置
        vm.$refs.myscrollfull.mescroll.scrollTo(vm.lastScrollTop, 300); // 滚动到底部
        // vm.$refs.myscrollfull.mescroll.hideTopBtn(0); // 隐藏回到顶部按钮,无渐隐动画
      }
    });
  },
  // 离开路由时,记录列表状态
  beforeRouteLeave(to, from, next) {
    // this.websock.close();
    // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
    if (this.$refs.myscrollfull.mescroll) {
      this.$refs.myscrollfull.mescroll.lastBounce = this.$refs.myscrollfull.mescroll.optUp.isBounce; // 记录当前是否禁止ios回弹
      this.$refs.myscrollfull.mescroll.setBounce(true); // 允许bounce
      this.lastScrollTop = this.$refs.myscrollfull.mescroll.getScrollTop();
      this.$refs.myscrollfull.mescroll.lastScrollTop = this.$refs.myscrollfull.mescroll.getScrollTop(); // 记录当前滚动条的位置
      // this.$refs.myscrollfull.mescroll.hideTopBtn(0); // 隐藏回到顶部按钮,无渐隐动画
    }
    this.websock = null;
    next();
  },
  activated() {
    const self = this;
    this.ID = this.$route.params.data;
    this.animationTime = Date.now();
    // if (!this.websock) {
    //   self.$vux.loading.show({
    //     text: "正在连接中..."
    //   });
    //   this.initWebSocket();
    // }
  }
};
</script>
<style lang="scss" scoped="">
@import "@/assets/scss/base.scss"; /*引入配置*/
.enclosure-page {
  background-color: $background-color-themesec;
  width: 100%;
  height: 100%;
  overflow: scroll;
  font-size: 32px;
  .lb-tab {
    background-color: $background-color-theme;
    position: fixed;
    top: 100px;
    left: 0;
    width: 100%;
    height: 100px;
    z-index: 2;
  }
  .scroll-top {
    width: 100%;
    height: 78%;
    // margin-top: 200px;
    position: fixed;
    top: 200px;
  }
  .lb-group {
    .box {
      margin-top: 60px;
      width: 100%;
      min-height: 100px;
      overflow: hidden;
      .lb-panel {
        width: 100%;
        & > div {
          float: left;
        }

        .img-man {
          width: 15%;
          padding: 0 10px;
          .img {
            width: 80px;
            height: 80px;
            background: url("../../assets/images/chatman.png") no-repeat center;
            background-size: 100%;
          }
        }
        .info {
          width: 85%;
          padding-right: 110px;
          .info-text {
            float: left;
            max-width: 85%;
            min-height: 2em;
            padding: 20px;
            line-height: 40px;
            background: rgba(255, 255, 255, 1);
            border-radius: 10px;
            position: relative;
            z-index: 2;
            .triangleLeft {
              width: 0;
              height: 0;
              border-top: 10px solid transparent;
              border-bottom: 10px solid transparent;
              border-right: 16px solid $border-color-theme1;
              position: absolute;
              left: -15px;
              top: 20px;
            }
            .triangleRgiht {
              width: 0;
              height: 0;
              border-top: 10px solid transparent;
              border-bottom: 10px solid transparent;
              border-left: 16px solid $border-color-theme2;
              position: absolute;
              right: -15px;
              top: 20px;
            }
          }
        }
        &.myText > div {
          float: right;
        }
        &.myText > .info {
          padding-right: 10px;
        }
        &.myText > .info .info-text {
          float: right;
          background-color: $border-color-theme2;
          color: $font-color-theme1;
        }
      }
    }
    .evaluation-box {
      .img-evaSheet {
        width: 72px;
        height: 72px;
        display: block;
      }
      .title-box {
        height: 80px;
        width: 100%;
        display: flex;
        align-content: center;
        justify-content: center;
        .line {
          margin: 15px;
          display: block;
          border-top: 2px solid $border-color-theme;
          width: 130px;
          height: 1px;
        }
        .text {
          color: $font-color-theme3;
          font-size: 26px;
        }
      }
      .evaSheet-list {
        background-color: $background-color-theme;
        margin: auto;
        width: 542px;
        border-radius: 20px;
        padding: 20px 40px;
        overflow: hidden;
        .name {
          width: 100%;
          text-align: center;
          padding: 10px;
          border-bottom: 2px dashed $border-color-theme;
        }
      }
    }
  }
  .call-box {
    position: fixed;
    top: 220px;
    left: 0;
    width: 100%;
    background-color: $background-color-theme;
    .call-list {
      padding: 30px 20px 20px 90px;
      position: relative;
      .iconfont {
        position: absolute;
        left: 30px;
        top: 50px;
      }
      .connect {
        color: $font-color-theme2;
      }
      .notConnect {
        color: $font-color-shallow9;
      }
      .talkTime {
        position: absolute;
        right: 20px;
        top: 40px;
        font-size: $font_little_s;
        width: 240px;
        span {
          width: 160px;
        }
      }
      .phone {
        color: $font-color-shallow9;
        font-size: $font_little_s;
        margin-top: 10px;
      }
      .date {
        font-size: $font_little;
      }
    }
  }
}
</style>
<style lang="scss">
@import "@/assets/scss/base.scss"; /*引入配置*/
.enclosure-page .weui-icon-search:before {
  display: none;
}
.enclosure-page .weui-search-bar__label {
  display: none;
}
.enclosure-page .weui-search-bar__form {
  height: 100%;
}
.enclosure-page .weui-search-bar__cancel-btn {
  line-height: 14px;
}

.appraise-sheet .weui-media-box_appmsg .weui-media-box__hd {
  width: 28px;
  height: 28px;
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;
}
.appraise-sheet a.weui-media-box {
  color: $font-color-theme3;
}
.enclosure-page .evaSheet-list .weui-media-box {
  padding-top: 30px;
}
</style>
