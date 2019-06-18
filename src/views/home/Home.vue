<template>
  <div class="home">
    home页面
    <div class="router-btn" @click="routerGo('about')">about123</div>
    <div class="router-btn" @click="routerGo('mapArea')">mapAreay页面</div>
    <div class="router-btn" @click="routerGo('chatOnline', 1)">我是用户1</div>
    <div class="router-btn" @click="routerGo('chatOnline', 2)">我是用户2</div>
  </div>
</template>
<script>
// import BMap from "BMap";
export default {
  data: function() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    routerGo(name, id) {
      this.$router.push({ name: name, params: { data: id, id: id } });
    }
  }
};
</script>

<!--Add"scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.home {
  font-size: 34px;
  .router-btn {
    padding: 20px 30px;
  }
}
</style>
