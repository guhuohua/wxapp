import Vue from 'vue'
import App from './address'
import global_ from '../../components/Global'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    'navigationBarTitleText': '我的收货地址'
  }
}
