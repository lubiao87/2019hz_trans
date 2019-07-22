// 导入api接口模块
import reqUrl from "./api-p/request_url";
import reqUrl2 from "./api-p/module_url";
import reqUrl3 from "./api-p/request2_url";

// 获取当前环境变量 false => 生产环境 true => 开发环境
const BASEURL =
  process.env.NODE_ENV === "development" ? "/transApp" : "/transApp";
const BASEURL2 =
  process.env.NODE_ENV === "development" ? "/transApp2" : "/transApp2";
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
export default [api, api2, api3];
