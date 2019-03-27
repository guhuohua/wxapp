import Vue from 'vue'
import App from './App'
import '../static/css/weui.css'

// 引用全局变量文件，
import global_ from './components/Global'
// Vue.use(global_)

Vue.config.productionTip = false

// 挂载到vue实例上
Vue.prototype.GLOBAL = global_;
Vue.prototype.APPID = 'JUSXNFOOAKS';
App.mpType = 'app';

const app = new Vue(App)
app.$mount()

export default {

  config: {
    pages: [
      'pages/login/main',
      'pages/notlogin/main',
      '^pages/index/main',
      'pages/recommend/main',
      'pages/types/main',
      'pages/typeGoodsList/main',
      'pages/goods/main',
      'pages/order/main',
      'pages/orderList/main',
      'pages/shopcar/main',
      'pages/user/main',
      'pages/address/main'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fcfcfc',
      navigationBarTitleText: 'vue微信小程序',
      navigationBarTextStyle: 'black',
    },
    tabBar: {
      color: '#9a9a9a',
      selectedColor: '#9b9b9b',
      // backgroundColor: '#f0f0f0',
      backgroundColor: '#ffffff',
      borderStyle: 'black',
      list: [{
        pagePath: 'pages/index/main',
        iconPath: 'static/img/icon/index.png',
        selectedIconPath: 'static/img/icon/index_select.png',
        text: '首页'
      },
      {
        pagePath: 'pages/types/main',
        iconPath: 'static/img/icon/classification.png',
        selectedIconPath: 'static/img/icon/classification_select.png',
        text: '分类'
      },
      {
        pagePath: 'pages/shopcar/main',
        iconPath: 'static/img/icon/shopcar.png',
        selectedIconPath: 'static/img/icon/shopcar_select.png',
        text: '购物车'
      },
      {
        pagePath: 'pages/user/main',
        iconPath: 'static/img/icon/user.png',
        selectedIconPath: 'static/img/icon/user_select.png',
        text: '我的'
      }
      ]
    }
  }
}
