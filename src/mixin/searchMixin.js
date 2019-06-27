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
      listData: []
    }
  },
  methods: {
    /*
     * 发送请求
     */
    sendReq (params, callback) {
      console.log(params)
      let self = this
      request({
        method: params.method || 'POST',
        url: params.url,
        data: params.data || {},
        // cache: false,
        // dataType: 'json',
        headers: {
          'Content-type': params.contentType || 'application/json'
        }
      }).then((res) => {
        // 如果该请求不需要干扰到loading，那么需要设置 doNotDisturbLoading 为 true
        if (res && res.data) {
          callback && callback(res.data)
        }
      }, (error) => {
        let res = error.data
      })
    }
  }
}
