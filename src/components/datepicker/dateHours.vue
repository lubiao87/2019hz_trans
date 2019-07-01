<template>
  <div class="date-hours" v-show="showCalendar">
    <transition name="am-calendar-mask">
      <div class="am-calendar-backdrop"></div>
    </transition>
    <transition name="am-calendar-content">
      <div class="am-calendar-content">
        <div class="date-day">
          <div class="date">{{ setDate }}</div>
          <div class="text">时间</div>
          <div class="btn-success" @click="setHours">确定</div>
        </div>
        <div class="select-box">
          <!-- <hours :maps="maps" :map.sync="map" /> -->
          <picker :data="hours" v-model="hour" @on-change="change"></picker>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
// import hours from "@/components/datepicker/scrollPicher";
import { Picker } from "vux";
export default {
  components: {
    // hours,
    Picker
  },
  props: {
    showCalendar: {
      type: Boolean,
      default: false
    },
    date: {
      type: String,
      default: ""
    }
  },
  data: function() {
    return {
      title: "评价服务",
      hours: [
        [
          {
            name: "08:00 ~ 10:00",
            value: "08:00 ~ 10:00"
          },
          {
            name: "10:00 ~ 12:00",
            value: "10:00 ~ 12:00"
          },
          {
            name: "12:00 ~ 14:00",
            value: "12:00 ~ 14:00"
          },
          {
            name: "14:00 ~ 16:00",
            value: "14:00 ~ 16:00"
          },
          {
            name: "16:00 ~ 18:00",
            value: "16:00 ~ 18:00"
          },
          {
            name: "18:00 ~ 20:00",
            value: "18:00 ~ 20:00"
          }
        ]
      ],
      hour: ["12:00 ~ 14:00"]
      // maps: [],
      // map: {} //selected item
    };
  },
  computed: {
    setDate: {
      get() {
        let date = "";
        let arr = this.date.split("/");
        date = arr[0] + "年" + arr[1] + "月" + arr[2] + "日";
        return date;
      },
      set(val) {
        return val;
      }
    }
  },
  created() {},
  mounted: function() {
    // this.$nextTick(() => {
    //   this.maps = [
    //     { alias: "18:00 ~ 20:00", defData: 6 },
    //     { alias: "16:00 ~ 18:00", defData: 5 },
    //     { alias: "14:00 ~ 16:00", defData: 4 },
    //     { alias: "12:00 ~ 14:00", defData: 3 },
    //     { alias: "10:00 ~ 12:00", defData: 2 },
    //     { alias: "08:00 ~ 10:00", defData: 1 }
    //   ];
    //   this.map = this.maps[3]; //init first selected item
    // });
  },
  methods: {
    setHours() {
      // this.$emit("changeDate", this.map);
      this.$emit("update:showCalendar", false);
    },
    change(value) {
      this.$emit("changeDate", value);
    }
  }
};
</script>
<style lang="scss" scoped="">
@import "@/assets/scss/base.scss"; /*引入配置*/
.am-calendar-mask-enter,
.am-calendar-mask-leave-to {
  opacity: 0;
}
.am-calendar-enter-active,
.am-calendar-leave-active {
  transition: opacity 0.4s ease;
}
.am-calendar-content-enter-active {
  animation: bounce-in 0.4s;
}
.am-calendar-content-leave-active {
  animation: bounce-out 0.4s;
}
@keyframes bounce-in {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
}
@keyframes bounce-out {
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(100%);
  }
}
.date-hours {
  width: 100%;
  height: 100%;
  .am-calendar-backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 997;
  }
  .am-calendar-content {
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 70%;
    overflow: hidden;
    z-index: 998;
    color: $background-color-theme3;
    user-select: none;
    transform: translateY(0);
    .date-day {
      width: 100%;
      height: 100px;
      background-color: #efeff4;
      display: inline-block;
      & > div {
        height: 100%;
        line-height: 100px;
        float: left;
        letter-spacing: 2px;
      }
      .date {
        padding-left: 20px;
        color: $font-color-theme3;
        width: 45%;
      }
      .text {
        color: $font-color-theme;
        width: 3em;
        text-align: center;
        padding: 0;
        border-bottom: 2px solid $font-color-theme;
      }
      .btn-success {
        text-align: center;
        width: 25%;
        float: right;
        color: $font-color-theme2;
      }
    }
  }
  .select-box {
    height: 90%;
  }
}
</style>
