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
      let self = this
      request({
        method: params.method || 'POST',
        url: params.url,
        data: params.data || {},
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
    },
    /**
     * 根据页码、条数 查询
     */
    searchForPage () {
      let self = this
      let params = self.getParams()
      if (!params) return false
      self.loading = true
      self.sendReq(params, (res) => {
        self.listData = res || []
      })
    }
  }
}
