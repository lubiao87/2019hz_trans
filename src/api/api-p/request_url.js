export default BSEURL => {
  return {
    // logout: BSEURL + "/user/logout", // 退出
    // login: BSEURL + "/user/login" // 登录
    uploadFile: BSEURL + "/reporting/reportingObstacles", // 上传文件
    getOrderId: BSEURL + "/order/creatOrderId",//获取服务单号
    generateOrder: BSEURL + "/order/generateOrder", //生成服务单
    getOrderDetail: BSEURL + "/order/getOrderDetail",//服务单详情
    generateComplain: BSEURL + "/complain/generateComplain",//一键报障
    getComplainDetail: BSEURL + "/complain/getComplainDetail",//投诉建议单详情
    reportingObstacles: BSEURL + "/reporting/reportingObstacles", //一键报障
    getLists: BSEURL + "/complain/getComplainByCustIdAndStatus", //我的投诉记录
    callListByCustId: BSEURL + "/call/callListByCustId", //用户一键呼叫记录
    evaluationComplain: BSEURL + "/complain/evaluationComplain", //投诉建议单评价
    findenginnerByOtherCode: BSEURL + "/findenginner/findenginnerByOtherCode", //其他方式查找工程师
    findenginnerByLAL: BSEURL + "/findenginner/findenginnerByLAL",//根据经纬度推荐工程师
    findenginnerByBdCode: BSEURL + "/findenginner/findenginnerByBdCode",//根据绑定号寻找工程师
  };
};
