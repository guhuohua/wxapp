let util = {};

const BaseUrl = process.env.NODE_ENV === 'development'
  // 测试接口地址
  ? 'http://localhost:8080'
  // ? 'http://192.168.31.142:8080'
  // ? 'http://192.168.1.112:8080'
  // ? 'http://192.168.1.109:8080'
  // ? 'http://qqmxd.xyz:10030'
  // ? 'http://117.50.74.117:10030/wxshop'
  // 线上接口地址
  // : 'http://qqmxd.xyz:10030';
  // : 'https://www.inbole.com/wxshop';
  // : 'https://www.inbatu.com/wxshop_rlsm';
  : 'https://www.inbole.com/wxshop';

util.API = BaseUrl;

export default util;
