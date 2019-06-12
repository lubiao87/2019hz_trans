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
      <div class="lb-group">
        <div
          slot="content"
          class="box"
          v-for="(item, index) in dataList"
          :key="index"
        >
          <div class="lb-panel" :class="{ myText: item.name === '小四' }">
            <div class="img-man">
              <div class="img"></div>
            </div>
            <div class="info">
              <div
                class="info-text"
                :style="{ width: item.text.length + 2 + 'em' }"
              >
                {{ item.text }}
                <div
                  :class="{
                    triangleLeft: item.name === '小三',
                    triangleRgiht: item.name === '小四'
                  }"
                ></div>
              </div>
            </div>
            <!-- <div class="info">{{item.name}} {{item.mobile}}</div> -->
            <!-- <x-button class="onButton" @click.native="onButtonClick(item.id)">删除</x-button> -->
          </div>
        </div>
      </div>
    </v-scroll-full>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex"; //先要引入
import VScrollFull from "@/components/mescroll/downScroll";
import BHead from "@/components/base/B-Head";

export default {
  components: {
    BHead,
    VScrollFull
  },
  data: function() {
    return {
      title: "在线聊天",
      colorChange: false,
      showBack: true,
      dataList: [
        {
          name: "小三",
          gender: "man",
          text: "你好，我家的网络可以连接，但是不 能上网？",
          time: "2019-6-10 14:30:36"
        },
        {
          name: "小四",
          gender: "man",
          text: "请提供您的装机地址",
          time: "2019-6-10 14:30:58"
        },
        {
          name: "小三",
          gender: "man",
          text: "佳都商务大厦801室",
          time: "2019-6-10 14:32:08"
        },
        {
          name: "小四",
          gender: "man",
          text: "好的，我马上过去",
          time: "2019-6-10 14:33:08"
        },
        {
          name: "小三",
          gender: "man",
          text: "带好现金",
          time: "2019-6-10 14:33:08"
        },
        {
          name: "小四",
          gender: "man",
          text: "完全没问题",
          time: "2019-6-10 14:33:08"
        }
      ],
      pageSize: 1
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
  created() {
    // this.dataList = this.dataList.reverse()
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.$refs.myscrollfull.$_upCallback(this.dataList.length, 1);
    // });
  },
  methods: {
    ...mapActions("collection", [
      //collection是指modules文件夹下的collection.js
      "invokePushItems" //collection.js文件中的actions里的方法，在上面的@click中执行并传入实参
    ]),
    // 上拉刷新
    loadData() {
      console.log("可以上拉");
      const self = this;
      this.pageSize++;
      setTimeout(() => {
        // _this.list.push(pageIndex + '_')
        self.dataList.unshift({
          name: "小四",
          gender: "man",
          text: "可以" + new Date().getTime(),
          time: "2019-6-10 14:30:36"
        });
        self.dataList.unshift({
          name: "小三",
          gender: "man",
          text: "可以洗澡吗？" + new Date().getTime(),
          time: "2019-6-10 14:30:36"
        });
        self.$refs.myscrollfull.endByPage(self.dataList.length, self.pageSize);
      }, 400);
    },
    loadMores() {
      console.log("下拉干嘛");
      // self.$refs.myscrollfull.endByPage(self.dataList.length, 1);
      // alert("可以洗澡");
    }
  },
  mounted() {},
  watch: {
    // $route(to, from) {
    //   console.log(to.name);
    //   this.$store.dispatch("footerStatus/showFooter"); //这里改为'footerStatus/showFooter',
    //   //意思是指footerStatus.js里actions里的showFooter方法
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
    height: 85%;
    margin-top: 100px;
  }
  .lb-group {
    // margin-top: 100px;
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
            max-width: 100%;
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
              border-right: 16px solid #fff;
              position: absolute;
              left: -15px;
              top: 20px;
            }
            .triangleRgiht {
              width: 0;
              height: 0;
              border-top: 10px solid transparent;
              border-bottom: 10px solid transparent;
              border-left: 16px solid #fff;
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
        }
      }
    }
  }
}
</style>
