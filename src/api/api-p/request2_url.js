export default BSEURL => {
  return {
    getOrderId: BSEURL + "/findenginner/findenginnerByBdCode", //根据绑定号寻找工程师
    findenginnerByLAL: BSEURL + "/findenginner/findenginnerByLAL", //根据经纬度推荐工程师
    findenginnerByOtherCode: BSEURL + "/findenginner/findenginnerByOtherCode", //其他方式查找工程师
    chatOnline: BSEURL + "/chat/" // 在线聊天
  };
};
