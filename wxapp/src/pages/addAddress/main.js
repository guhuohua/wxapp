import Vue from 'vue'
import App from './addAddress'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    'navigationBarTitleText': '添加收货地址'
  }
}
