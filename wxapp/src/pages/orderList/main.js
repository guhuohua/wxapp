import Vue from 'vue'
import App from './orderList'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    'navigationBarTitleText': '我的订单'
  }
}
