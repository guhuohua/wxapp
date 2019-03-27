import Vue from 'vue'
import App from './login'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    'navigationBarTitleText': '用户登录',
    'backgroundTextStyle': 'dark',
    'navigationBarTextStyle': 'black'
  }
}
