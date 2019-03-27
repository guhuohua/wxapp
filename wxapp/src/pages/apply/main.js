import Vue from 'vue'
import App from './apply'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    'navigationBarTitleText': '申请账号',
    'backgroundTextStyle': 'dark',
    'navigationBarTextStyle': 'black'
  }
}
