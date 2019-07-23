<template>
  <div id="app" style="width: 100%;height: 100%;overflow:hidden">
    <transition :name="transitionName">
      <keep-alive>
        <router-view class="child-view" v-if="$route.meta.keepAlive">
          <!-- 这里是会被缓存的视图组件，比如 page1,page2 -->
        </router-view>
      </keep-alive>
    </transition>
    <transition :name="transitionName">
      <router-view class="child-view" v-if="!$route.meta.keepAlive">
        <!-- 这里是不被缓存的视图组件，比如 page3 -->
      </router-view>
    </transition>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      transitionName: "slide-left"
    };
  },
  //监听路由的路径，可以通过不同的路径去选择不同的切换效果
  watch: {
    $route(to, from) {
      const toDepth = to.path.split("/")[1];
      // const fromDepth = from.path.split("/")[1];
      // console.log(toDepth, fromDepth);
      this.transitionName = toDepth === "home" ? "slide-right" : "slide-left";
    }
  }
};
</script>
<style lang="less">
@import "~vux/src/styles/1px.less";
html,
body {
  width: 100%;
  height: 100%;
}
.anchorBL {
  display: none;
}
.child-view {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  transition: all 0.2s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
}
@import "~@/assets/icon/iconfont.css";
</style>
