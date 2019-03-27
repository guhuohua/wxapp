import Vue from 'vue'
import App from './shopcar'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    'navigationBarTitleText': '我的购物车',

    // 下拉刷新
    'enablePullDownRefresh': true,
    'backgroundTextStyle': 'dark',
    'navigationBarTextStyle': 'black'
  }
}
