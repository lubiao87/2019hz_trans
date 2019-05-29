<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex"; //先要引入
import { constants } from "crypto";
export default {
  data: function() {
    return {
      user: {
        name: "彪彪"
      }
    };
  },

  created() {
    this.initWebSocket();
  },
  computed: {
    ...mapGetters("footerStatus", {
      //用mapGetters来获取collection.js里面的getters
      scorketId: "getscorketId"
    })
  },
  methods: {
    initWebSocket() {
      //初始化weosocket
      const wsuri = `ws://192.168.11.49:9998/echo`; //这个地址由后端童鞋提供
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen() {
      //连接建立之后执行send方法发送数据
      this.websocketsend(this.user);
      // console.log("连接建立");
    },
    websocketonerror() {
      //连接建立失败重连
      this.initWebSocket();
    },
    websocketonmessage(e) {
      //数据接收
      // console.log("连接成功: " + this.scorketId);
      console.log(JSON.parse(e.data));
      if (e.data == "连接成功") {
        //这个判断是我业务需求才加的
        return;
      }
      //业务需求，将socket接收到的值存进vuex
      this.$store.dispatch("footerStatus/RESET_ID"); //先调用reset方法置空vuex > store里面的scorketId（为什么置空，下面标题3解释）
      this.$store.dispatch("footerStatus/SAVE_ID", 23); //重新给store中的scorketId赋值（数据格式问题先转了json）
      // this.SAVE_ID("23")
      // console.log(_this.$store.state);
    },
    websocketsend(Data) {
      //数据发送
      this.websock.send(JSON.stringify(Data));
    },
    websocketclose(e) {
      //关闭
      console.log("断开连接", e);
    }
  }
};
</script>
<style lang="scss" scoped="">
@import "@/assets/scss/base.scss";
body {
  font-size: 16px;
}
</style>
