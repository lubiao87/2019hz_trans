<template>
  <div>
    home页面
    <div @click="routerGo">about</div>
  </div>
</template>
<script>
import BMap from "BMap";
export default {
  data: function() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    routerGo() {
      this.$router.push({ name: "about", params: { data: 666 } });
    }
  }
};
</script>

<!--Add"scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss"></style>
