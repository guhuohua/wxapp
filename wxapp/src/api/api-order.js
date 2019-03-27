// const baseURL = process.env.API_BASE_URL;
import BaseUrl from './urlConfig';

const url = BaseUrl.API;

let api = {

    /**
     * 添加订单
     * @param data
     * @param code
     * @param func
     */
    orderSubmit(data, success, fail) {
      wx.request({
        url: url + '/order/insert',
        method: 'POST',
        data: data,
        success: success,
        fail: fail
      })
    },

    getOrderList(id, index, success, fail) {
      wx.request({
        url: url + "/order/select/" + id + "/" + index,
        success: success,
        fail: fail
      });
    },


    /**
     * 获取用户购物车信息
     * @param uId
     * @param success
     * @param fail
     */
    getShopCarList(uId, success, fail) {
      wx.request({
        url: url + "/shopcar/select/" + uId,
        success: success,
        fail: fail
      });
    },

    /**
     * 更新购物车信息
     * @param data
     * @param success
     * @param fail
     */
    updataShopCarList(data, success, fail) {
      wx.request({
        url: url + "/shopcar/update",
        data: data,
        method: 'POST',
        success: success,
        fail: fail
      });
    },

    /**
     * 删除
     * @param data
     * @param success
     * @param fail
     */
    deleteShopCarItem(data, success, fail) {
      wx.request({
        url: url + "/shopcar/delete",
        data: data,
        method: 'POST',
        success: success,
        fail: fail
      });
    },

    /**
     * 创建付款订单
     * @param data
     * @param success
     * @param fail
     */
    createPayOrder(data, success, fail) {
      wx.request({
        url: url + "/wxpay/prepay",
        data: data,
        method: 'POST',
        success: success,
        fail: fail
      });
    },
    completePayOrder(data, success, fail) {
      wx.request({
        url: url + "/wxpay/complete",
        data: data,
        method: 'POST',
        success: success,
        fail: fail
      });
    },

    cancelOrder(data, success, fail) {
      wx.request({
        url: url + "/order/cancel",
        data: data,
        method: 'POST',
        success: success,
        fail: fail
      });
    },
    confirmOrder(data, success, fail) {
      wx.request({
        url: url + "/order/confirm",
        data: data,
        method: 'POST',
        success: success,
        fail: fail
      });
    },
    physicalOrder(shipSn, success, fail) {
      wx.request({
        url: url + "/order/shipInfo/" + shipSn,
        method: 'GET',
        success: success,
        fail: fail
      });
    }
    ,

  }
;

export default api;

