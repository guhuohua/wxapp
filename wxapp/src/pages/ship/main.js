import Vue from 'vue';
import App from './ship';

const app = new Vue(App);
app.$mount();

export default {
  config: {
    'navigationBarTitleText': '快递信息'
  }
}

