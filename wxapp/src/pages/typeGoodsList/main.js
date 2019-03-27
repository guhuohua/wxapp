import Vue from 'vue'
import App from './typeGoodsList'

const app = new Vue(App);
app.$mount();

export default {
  config: {
    'navigationBarTitleText': '分类'
  }
}
