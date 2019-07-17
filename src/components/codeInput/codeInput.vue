<template>
  <div class="ys-verification" v-show="showFlag">
    <div class="content">
      <div class="stip">
        输入机主“ <span>{{ userName }}</span> ”的身份证后4位
      </div>
      <div class="input-box flex-middle">
        <div class="input-wrapper" v-for="item in amount" :key="item">
          <input
            type="number"
            @paste="handlePaste"
            title="code"
            v-focus="item - 1 === currentIndex"
            maxlength="1"
            @input="handleInput($event, item - 1)"
            @keyup.delete="onDelete($event, item - 1)"
            v-model="code[item - 1]"
          />
        </div>
      </div>
      <div class="btn-box">
        <div class="cancel" @click="hidePage">取消</div>
        <div class="submit" @click="submitCode">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VerificationCodeInput",
  props: {
    amount: {
      type: Number,
      default: 4
    },
    userName: {
      type: String,
      default: "陈*梅"
    },
    showFlag: {
      type: Boolean,
      default: true
    }
  },
  directives: {
    focus: {
      componentUpdated: function(el, obj) {
        obj.value && el.focus();
      }
    }
  },
  created() {
    this.code = new Array(this.amount).fill("");
  },
  methods: {
    handleInput(e, index) {
      this.currentIndex = index;
      e.target.value = this.validateNumber(e.target.value);
      e.target.value !== "" && ++this.currentIndex;
      !this.code.includes("") && this.$emit("onCompleted", this.code.join(""));
    },
    onDelete(e, index) {
      if (e.target.value === "") {
        this.currentIndex = index - 1;
      }
    },
    validateNumber(val) {
      return val.replace(/\D/g, "");
    },
    handlePaste(e) {
      e.preventDefault();
    },
    hidePage() {
      let data = {
        showInputBox: false
      };
      this.$emit("childrenData", data);
    },
    submitCode() {
      let data = {
        showInputBox: false,
        routerLink: "searchResult"
      };
      this.$emit("childrenData", data);
    }
  },
  data() {
    return {
      code: [],
      currentIndex: 0
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/base.scss"; /*引入配置*/
.ys-verification {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  justify-content: space-around;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10;

  .content {
    margin: 30% auto;
    width: 85%;
    height: 320px;
    background: $background-color-theme;
    border: 1px solid $border-color-theme;
    border-radius: 8px;
    padding-top: 20px;
    position: relative;
    .stip {
      color: $font-color-shallow6;
      width: 100%;
      height: 80px;
      line-height: 80px;
      text-align: center;
      span {
        color: $font-color-shallow0;
      }
    }
    .input-box {
      width: 100%;
      height: 90px;
      .input-wrapper {
        // border-bottom: 1px solid #d6d6d6;
        width: 15%;
        position: relative;
        margin: 0 10px;
        input {
          // position: absolute;
          width: 88px;
          height: 88px;
          text-align: center;
          transition: all 0.3s;
          font-size: $font_large_s;
          color: #333333;
          background-color: #eef2f5;
        }
      }
    }
    .btn-box {
      height: 88px;
      width: 100%;
      border-top: 1px solid $border-color-theme;
      position: absolute;
      left: 0;
      bottom: 0;
      & > div {
        width: 50%;
        float: left;
        height: 100%;
        line-height: 88px;
        font-size: $font_medium_s;
        text-align: center;
      }
      & > div:active {
        opacity: 0.8;
      }
      .cancel {
        border-right: 1px solid $border-color-theme;
        color: $font-color-shallow9;
      }
      .submit {
        color: $font-color-theme2;
      }
    }
  }
}
</style>
