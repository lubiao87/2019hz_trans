// 导入api接口模块
import reqUrl from "./api-p/request_url";
import reqUrl2 from "./api-p/module_url";
import reqUrl3 from "./api-p/request2_url";

// 获取当前环境变量 false => 生产环境 true => 开发环境
const BASEURL =
  process.env.NODE_ENV === "development" ? "/transApp" : "/transApp";
const BASEURL2 =
  process.env.NODE_ENV === "development" ? "/lTransApp" : "/lTransApp";
const BASEURL4 =
  process.env.NODE_ENV === "development" ? "/DtransApp" : "/DtransApp";
const txfwapp =
  process.env.NODE_ENV === "development" ? "/wx-course" : "/wx-course";
// console.log(process.env);
export const api = {
  ...reqUrl(BASEURL)
};
export const api2 = {
  ...reqUrl2(txfwapp)
};
export const api3 = {
  ...reqUrl3(BASEURL2)
};
export const api4 = {
  ...reqUrl(BASEURL4)
};
export default [api, api2, api3,api4];
