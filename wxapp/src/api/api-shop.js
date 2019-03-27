// const baseURL = process.env.API_BASE_URL;
import BaseUrl from './urlConfig';
const url = BaseUrl.API;

let api = {

  /**
   * 查询店铺信息
   * @param data
   * @param code
   * @param func
   */
  getShopInfoByIds(ids, success, fail, complete) {
    wx.request({
      url: url + '/shop/select/list/' + ids,
      method: 'GET',
      // data: data,
      success: success,
      fail: fail,
      complete: complete
    })
  },



};

export default api;

