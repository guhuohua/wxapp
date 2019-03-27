// const baseURL = process.env.API_BASE_URL;
import BaseUrl from './urlConfig';
const url = BaseUrl.API;

let api = {

  /**
   * 获取首页滚动图信息
   * @param success
   * @param fail
   */
  getIndexSwiper(success, fail) {

    wx.request({
      url: url + "/info/getIndexSwiper",
      success: success,
      fail: fail
    });
  },

  /**
   * 获取首页热门信息
   * @param success
   * @param fail
   */
  getIndexHotList(success, fail) {

    wx.request({
      url: url + "/info/getIndexHotList",
      success: success,
      fail: fail
    });
  },

  /**
   * 获取首页精品推荐信息
   * @param success
   * @param fail
   */
  getIndexQualityList(success, fail) {

    wx.request({
      url: url + "/info/getIndexQualityList",
      success: success,
      fail: fail
    });
  }
};

export default api;
