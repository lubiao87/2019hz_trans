/*
 * 列表搜索的 mixin
 */
import Vue from "vue";
import request from "./server";
// import {Message} from 'element-ui'
// Vue.component(Message)
/* eslint-disable */
export const listSearch = {
  data () {
    return {
      // 加载中
      loading: false,
      // 页面的列表数据
      listData: [],
    }
  },
  methods: {
    /*
     * 发送请求
     */
    sendReq (params, callback) {
      let self = this;
      self.$vux.loading.show({
        text: 'Loading'
       })
      request({
        method: params.method || 'POST',
        url: params.url,
        data: params.data || {},
        params: params.method == 'GET' && params.data ? params.data : {},
        // cache: false,
        // dataType: 'json',
        headers: {
          'Content-type': params.contentType || 'application/json'
        }
      }).then((res) => {
        self.$vux.loading.hide();
        // console.log(res)
        // 如果该请求不需要干扰到loading，那么需要设置 doNotDisturbLoading 为 true
        if (res && res.data) {
          callback && callback(res.data)
        }
      }, (error) => {
        self.$vux.loading.hide();
        if(error.status == 500) {
          self.$vux.toast.text('网络出错', 'middle');
        }
        console.log(error)
      })
    }
  }
}
