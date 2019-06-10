<template>
  <div class="chat-online">
    <b-head :showBack="showBack" :title="title"></b-head>
    <div
      class="lb-group"
      v-infinite-scroll="loadMores"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="30"
    >
      <div
        slot="content"
        class="box"
        v-for="(item, index) in dataList"
        :key="index"
      >
        <div class="lb-panel">
          <div class="img img-man"></div>
          <div class="conter">
            <div class="info">{{ item.text }}</div>
            <!-- <div class="info">{{item.name}} {{item.mobile}}</div> -->
          </div>
          <!-- <x-button class="onButton" @click.native="onButtonClick(item.id)">删除</x-button> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex"; //先要引入
import BHead from "@/components/base/B-Head";
export default {
  components: {
    BHead
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
        }
      ]
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
  created() {},
  methods: {
    ...mapActions("collection", [
      //collection是指modules文件夹下的collection.js
      "invokePushItems" //collection.js文件中的actions里的方法，在上面的@click中执行并传入实参
    ]),
    loadMores() {
      const self = this;
      self.dataList.push({
        name: "小三",
        gender: "man",
        text: "可以洗澡吗？" + new Date().getTime(),
        time: "2019-6-10 14:30:36"
      });
      self.dataList.push({
        name: "小四",
        gender: "man",
        text: "可以" + new Date().getTime(),
        time: "2019-6-10 14:30:36"
      });
      console.log("可以洗澡");
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
  padding-bottom: 80px;
  .box {
    height: 200px;
    width: 100%;
  }
}
</style>
