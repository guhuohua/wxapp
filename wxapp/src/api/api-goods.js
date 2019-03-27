// const baseURL = process.env.API_BASE_URL;
import BaseUrl from './urlConfig';
const url = BaseUrl.API;

let api = {

  /**
   * 添加到购物车
   * @param data
   * @param success
   * @param fail
   */
  addToShopCar(data, success, fail) {
    wx.request({
      url: url + '/shopcar/insert',
      method: 'POST',
      data: data,
      success: function (res) {
        success(res);
      },

      fail: function (res) {
        fail(res);
      }
    })
  },

  /**
   * 获取商品详细信息
   * @param flag
   * @param success
   * @param fail
   */
  getGoodsInfoByFlag(flag, success, fail) {
    wx.request({
      url: url + "/goods/select/flag/" + flag,
      success: success,
      fail: fail
    });
  },

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
  },


  /**
   * 获取所有的分类
   * @param success
   * @param fail
   */
  getGoodsTypeList(success, fail) {
    wx.request({
      url: url + "/type/select",
      success: success,
      fail: fail
    });
  },

  /**
   * 获取所有的分类下的商品
   * @param success
   * @param fail
   */
  getGoodsByTypeId(typeid, success, fail) {
    wx.request({
      url: url + "/goods/select/type/" + typeid,
      success: success,
      fail: fail
    });
  },

  /**
   * 收索商品
   * @param key
   * @param success
   */
  searchGoods(data, success) {
    wx.request({
      url: url + "/goods/select/key",
      method: 'POST',
      data: data,
      success: success,
      file: function () {
        wx.showToast({
          title: '服务器异常',
          // icon: 'none'
          image: '../../static/img/icon/err.png'
        });
      }
    });
  },

  /**
   * 及时收索反馈关键字
   * @param key
   * @param success
   */
  getKeywordList(key,success) {
    wx.request({
      url: url + "/keyword/select/" + key,
      success: success,
      file: function () {
        wx.showToast({
          title: '服务器异常',
          // icon: 'none'
          image: '../../static/img/icon/err.png'
        });
      }
    });
  }

};

export default api;
