// const baseURL = process.env.API_BASE_URL;
import BaseUrl from './urlConfig';
const url = BaseUrl.API;

let api = {

  /**
   * 获取规格信息
   * @param args
   * @param success
   * @param fail
   */
  getGoodsSizeInfo(args, success, fail) {

    wx.request({
      url: url + "/size/select/flag/" + args,
      success: success,
      fail: fail
    });
  }
};

export default api;
