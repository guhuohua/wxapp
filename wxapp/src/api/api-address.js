// const baseURL = process.env.API_BASE_URL;
import BaseUrl from './urlConfig';
const url = BaseUrl.API;

let api = {
  /**
   * 添加新地址
   * @param data
   * @param success
   * @param fail
   */
  addNewAddress(data, success, fail) {
    wx.request({
      url: url + "/address/insert",
      data: data,
      method: "POST",
      success: success,
      fail: fail
    });
  },

  /**
   * 查询用户的地址信息
   * @param uid
   * @param s
   * @param f
   */
  getAddressInfoByUserId(uid, s, f) {
    wx.request({
      url: url + "/address/select/" + uid,
      success: s,
      fail: f
    })
  },

  /**
   * 获取最新的地址列表
   */
  getAddressList(s, f) {
    wx.request({
      url: url + "/address/selectList",
      success: s,
      fail: f
    })
  }
};

export default api;
