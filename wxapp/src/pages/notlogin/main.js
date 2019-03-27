import Vue from 'vue'
import App from './unlogin'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    'navigationBarTitleText': '精挑细选',
    'backgroundTextStyle': 'dark',
    'navigationBarTextStyle': 'black'
  }
}
