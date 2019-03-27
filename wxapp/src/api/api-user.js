// const baseURL = process.env.API_BASE_URL;
import BaseUrl from './urlConfig';
import show from './show-result';
const url = BaseUrl.API;

let api = {

  /**
   * 获取个人信息
   * @param data
   * @param code
   * @param func
   */
  getUserInfoFromServer(data, code, func) {

    wx.request({
      url: url + '/user/getUserInfo',
      method: 'POST',
      data: {
        res: data,
        code: code
      },
      success: function (res) {
        func(res);
      },

      fail: function () {
        func(false);
      }
    })
  },


  /**
   * 申请账号信息
   * @param data
   * @param code
   * @param func
   */
  applyAccount(data, code, func) {

    wx.request({
      url: url + '/user/applyAccount',
      method: 'POST',
      data: {
        res: data,
        code: code
      },
      success: function (res) {
        func(res);
      },

      fail: function () {
        show.show(false, "服务器异常")
      }
    })
  },

  userLogin(username, password, success) {

    wx.request({
      url: url + '/user/login',
      method: 'POST',
      data: {
        username: username,
        password: password
      },
      success: function (res) {
        success(res);
      },

      fail: function () {
        show.show(false, '服务器异常');
      }
    })
  },

  getInvitationInfo(id, success) {

    wx.request({
      url: url + '/user/getInvitationInfo/' + id,
      method: 'GET',
      success: function (res) {
        success(res);
      },

      fail: function () {
        show.show(false, '服务器异常');
      }
    })
  },


  updateInvitationInfo(data, success) {

    wx.request({
      url: url + '/user/updataInvitationInfo',
      method: 'POST',
      data: data,
      success: function (res) {
        success(res);
      },

      fail: function () {
        show.show(false, '服务器异常');
      }
    })
  },

  getUserInfo(id, success) {
    wx.request({
      url: url + '/user/info/' + id,
      method: 'GET',
      success: function (res) {
        success(res);
      },

      fail: function () {
        show.show(false, '服务器异常');
      }
    })
  }

};

export default api;

