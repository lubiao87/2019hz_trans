<template>
  <div class="chat-online">
    <b-head :showBack="showBack" :title="title"></b-head>
    <v-scroll-full
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
                  @on-img-error="onImgError"
                ></panel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-scroll-full>
    <div class="chat-box">
      <input
        type="text"
        v-model="msg"
        @click="scrollToBottom"
        @keyup.enter="onSubmit"
        value=""
      />
    </div>
    <float-btn :text="floatText" @onFloatBtnClicked="floatClick" />
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex"; //先要引入
import { Panel, TransferDomDirective as TransferDom } from "vux";
import VScrollFull from "@/components/mescroll/downScroll";
import BHead from "@/components/base/B-Head";
import FloatBtn from "@/components/dragBox/floatBtn";

export default {
  directives: {
    TransferDom
  },
  components: {
    BHead,
    VScrollFull,
    Panel,
    FloatBtn
  },
  data: function() {
    return {
      title: "在线聊天",
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
      floatText: "生成服务单"
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
    // self.$vux.loading.show({
    //   text: "正在连接中..."
    // });
    // this.initWebSocket();
  },
  methods: {
    // 点击浮动窗事件
    floatClick() {
      // console.log("点击浮动窗");
      const self = this;
      this.$router.push({
        name: "generatingOrders",
        params: {
          data: self.floatText
        }
      });
    },
    scrollToBottom() {
      // 点击输入
      this.$nextTick(() => {
        this.$refs.myscrollfull.mescroll.scrollTo(99999, 300); // 滚动到底部
      });
    },
    ...mapActions("collection", [
      //collection是指modules文件夹下的collection.js
      "invokePushItems" //collection.js文件中的actions里的方法，在上面的@click中执行并传入实参
    ]),
    // 发送消息
    onSubmit() {
      // this.$refs.myscrollfull.mescroll.scrollTo(99999, 300); // 滚动到底部
      const self = this;
      const time = self.getNowFormatDate();
      if (self.msg) {
        this.chatList.push({
          name: "用户1",
          gender: "man",
          text: this.msg,
          time: time
        });
        if (this.websock) {
          this.websocketonopen2();
        }
      }

      this.$nextTick(() => {
        this.msg = "";
        this.$refs.myscrollfull.mescroll.scrollTo(99999, 300); // 滚动到底部
      });
    },
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

        self.chatList.unshift({
          name: "用户2",
          gender: "man",
          text: "你洗澡了吗？ ",
          time: "2019-6-10 14:30:36"
        });
        self.chatList.unshift({
          name: "用户1",
          gender: "man",
          text: "真的 ",
          time: "2019-6-10 14:30:36"
        });

        self.chatList.unshift({
          name: "用户2",
          gender: "man",
          text: "真的吗？ ",
          time: "2019-6-10 14:30:36"
        });
        self.chatList.unshift({
          name: "用户1",
          gender: "man",
          text: "这可不是一般的有意思，一不小心就打你 ",
          time: "2019-6-10 14:30:36"
        });

        self.chatList.unshift({
          name: "用户2",
          gender: "man",
          text: "有意思吗 ",
          time: "2019-6-10 14:30:36"
        });
        self.chatList.unshift({
          name: "用户1",
          gender: "man",
          text: "ojbk ",
          time: "2019-6-10 14:30:36"
        });

        self.chatList.unshift({
          name: "用户2",
          gender: "man",
          text: "兄弟借点钱吧，100给不给 ",
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
    onImgError(item, $event) {
      console.log(item, $event);
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
    // 开启websock
    initWebSocket() {
      console.log(this.ID);
      const wsuri = this.GLOBAL + this.ID; //这个地址由后端童鞋提供
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage; //数据已接收
      this.websock.onopen = this.websocketmes;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    // 连接成功
    websocketmes() {
      console.log("连接成功");
      this.chatList = this.chatList.reverse();
      this.$nextTick(() => {
        this.$refs.myscrollfull.mescroll.scrollTo(99999, 300); // 滚动到底部
      });
      this.$vux.loading.hide();
    },
    // 连接成功发送消息
    websocketonopen2() {
      const self = this;
      const toSocketid = self.ID === 1 ? 2 : 1;
      const time = self.getNowFormatDate();
      let data = {
        type: "QUIT", //消息类型    "ENTER";  //用户登录  "SPEAK";  //广播 "QUIT";  //私聊 "WARN";  //警告
        username: "用户" + self.ID, //发送人名称
        socketid: self.ID, //发送人id
        toSocketid: toSocketid, //接收人id
        timestamp: time, //时间戳
        msg: self.msg //发送消息
      };
      //连接建立之后执行send方法发送数据
      this.websocketsend(JSON.stringify(data));
      // this.websocketsend(data);
      console.log("推送消息2: ", data);
    },
    //连接建立失败重连
    websocketonerror() {
      const self = this;
      console.log("链接失败");
      const number = 1 - (Date.now() - this.animationTime) / 30000;
      if (number < 0) {
        const self = this;
        self.$vux.loading.show({
          text: "连接失败，正在重新连接"
        });
        this.initWebSocket();
      } else {
        this.showPlugin();
        setTimeout(() => {
          self.$vux.loading.hide();
          self.$router.push({ name: "home" });
        }, 2000);
      }
    },
    //数据已接收
    websocketonmessage(e) {
      const self = this;
      let message = null;
      if (typeof e === "string") {
        message = JSON.parse(e);
      } else {
        message = e;
      }
      let messageData = null;
      if (typeof message.data === "string") {
        //这个判断是用户1业务需求才加的
        messageData = JSON.parse(message.data);
      } else {
        messageData = message.data;
      }
      console.log("messageData: ", messageData);
      const time = self.getNowFormatDate();
      this.chatList.push({
        name: "用户2",
        gender: "man",
        text: messageData.msg,
        time: time
      });
      this.$nextTick(() => {
        this.msg = "";
        this.$refs.myscrollfull.mescroll.scrollTo(99999, 300); // 滚动到底部
      });

      //业务需求，将socket接收到的值存进vuex
      // this.$store.dispatch("footerStatus/RESET_ID"); //先调用reset方法置空vuex > store里面的scorketId（为什么置空，下面标题3解释）
      // this.$store.dispatch("footerStatus/SAVE_ID", 23); //重新给store中的scorketId赋值（数据格式问题先转了json）
      // this.SAVE_ID("23")
      // console.log(_this.$store.state);
    },
    //数据发送
    websocketsend(Data) {
      this.websock.send(Data);
    },
    //关闭
    websocketclose(e) {
      console.log("断开连接", e);
      const self = this;
      self.$vux.loading.show({
        text: "连接失败"
      });
      setTimeout(() => {
        self.$vux.loading.hide();
        self.$router.push({ name: "home" });
      }, 2000);
    },
    // 获取当前时间
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var strDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var currentdate =
        date.getFullYear() +
        seperator1 +
        month +
        seperator1 +
        strDate +
        " " +
        date.getHours() +
        seperator2 +
        date.getMinutes() +
        seperator2 +
        date.getSeconds();
      return currentdate;
    },
    showPlugin() {
      this.$vux.loading.show({
        text: "连接失败返回页面",
        onShow() {
          console.log("Plugin: I'm showing");
        },
        onHide() {
          console.log("Plugin: I'm hiding now");
        }
      });
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
.chat-online {
  background-color: $background-color-themesec;
  width: 100%;
  height: 100%;
  overflow: scroll;
  font-size: 32px;
  .scroll-top {
    width: 100%;
    height: 82%;
    margin-top: 100px;
    position: fixed;
    bottom: 100px;
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
  .chat-box {
    position: fixed;
    z-index: 2;
    bottom: 0;
    left: 0;
    height: 100px;
    width: 100%;
    padding: 20px 40px;
    overflow: hidden;
    background: #f8f4f2;
    & > div {
      height: 100%;
      background: #f8f4f2;
    }
    input {
      height: 100%;
      font-size: 30px;
      width: 100%;
    }
  }
}
</style>
<style lang="scss">
@import "@/assets/scss/base.scss"; /*引入配置*/
.chat-online .weui-icon-search:before {
  display: none;
}
.chat-online .weui-search-bar__label {
  display: none;
}
.chat-online .weui-search-bar__form {
  height: 100%;
}
.chat-online .weui-search-bar__cancel-btn {
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
.chat-online .evaSheet-list .weui-media-box {
  padding-top: 30px;
}
</style>
