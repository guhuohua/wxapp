import Vue from 'vue';
import App from './recommend';

const app = new Vue(App);
app.$mount();

export default {
  config: {
    'navigationBarTitleText': '我的推荐'
  }
}
