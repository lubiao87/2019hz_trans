const state = {
  productCount: '', //业务号码（产品账号）
};
const getters = {
  getProductCount(state) {
      return state.productCount
  }
};
const mutations = {
  setProductCount(state,data) {
      state.productCount = data
  }
};
// const actions = {
  
// };
export default {
  namespaced: true, //用于在全局引用此文件里的方法时标识这一个的文件名
  state,
  getters,
  mutations,
//   actions
};