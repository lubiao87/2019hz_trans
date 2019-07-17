export default BSEURL => {
  return {
    // logout: BSEURL + "/user/logout", // 退出
    // login: BSEURL + "/user/login" // 登录
    uploadFile: BSEURL + "/reporting/reportingObstacles", // 上传文件
    generateOrder: BSEURL + "/order/generateOrder", //生成服务单
  };
};
