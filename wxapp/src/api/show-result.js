let show = {

  show(flag) {
    if (flag) {
      wx.showToast({
        title: '添加成功！',
        icon: 'success'
      });

    } else {
      wx.showToast({
        title: '操作失败！',
        // icon: 'none'
        image: '../../static/img/icon/err.png'
      });
    }
  },

  show(flag, title) {
    if (flag) {
      wx.showToast({
        title: title,
        icon: 'success'
      });

    } else {
      wx.showToast({
        title: title,
        // icon: 'none'
        image: '../../static/img/icon/err.png'
      });
    }
  }


};

export default show;
