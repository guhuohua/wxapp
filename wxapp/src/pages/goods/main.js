import Vue from 'vue'
import App from './goods'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    'navigationBarTitleText': '物品详情'
  }
}
