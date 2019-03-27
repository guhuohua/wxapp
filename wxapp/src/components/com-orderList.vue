<template>
  <div class="order_info">
    <div class="goods_logo">{{orderInfo.shopName}}</div>
    <view class="order_status" v-show="showOrderStatus && orderInfo.orderStatus == 0">待付款</view>
    <view class="order_status" v-show="showOrderStatus && orderInfo.orderStatus == 1">待发货</view>
    <view class="order_status" v-show="showOrderStatus && orderInfo.orderStatus == 2">已发货</view>
    <view class="order_status" v-show="showOrderStatus && orderInfo.orderStatus == 3">已完成</view>
    <view class="order_status" v-show="showOrderStatus && orderInfo.orderStatus == 4">交易成功</view>
    <view class="order_status" v-show="!showOrderStatus"></view>

    <div class="goods_list">

      <block v-for="(item, index) in orderInfo.itemList" :key="index" :index="index">
        <div class="goods_info">
          <image class="goods_photo" :src="item.goods.imgUrl"/>
          <div class="goods_text">
            <div class="goods_title">{{item.goods.title}}</div>
            <div class="goods_size">{{item.size}}</div>
          </div>

          <div v-if="showCounter" class="goods_count">
            <div class="sub btn_count" @click="sub">-</div>
            <div class="num btn_count" :v-text="count">{{item.count}}</div>
            <div class="add btn_count" @click="add">+</div>
          </div>
          <div v-if="!showCounter" class="goods_count_show">
            x{{item.count}}
          </div>
          <div class="goods_price">￥{{item.goods.price}}</div>
        </div>
      </block>

    </div>
    <div class="combined">
      <div class="shop_comb float_left">共计 {{orderInfo.count}} 件商品</div>
      <div class="allPrice float_right">￥{{orderInfo.orderPrice}}</div>
    </div>
    <div class="foot_option_button" v-if="orderInfo.orderStatus === 0">
      <span class="btn pay" @click="payOrder">立即付款</span>
      <span class="btn cancel" @click="cancelOrder">取消订单</span>
    </div>

    <div class="foot_option_button" v-if="orderInfo.orderStatus === 1">
      <span class="btn cancel" @click="pushOrder">催单</span>
    </div>

    <div class="foot_option_button" v-if="orderInfo.orderStatus === 2">
      <span class="btn cancel" @click="physicalOrder">查看物流</span>
      <span class="btn confirm" @click="confirmOrder">确认收货</span>
    </div>

    <div class="foot_option_button" v-if="orderInfo.orderStatus === 3">
      <span class="btn cancel" @click="cancelOrder">删除</span>
    </div>
  </div>
</template>

<script>
  import api from '../api/api-order'
  import show from '../api/show-result'

  export default {
    data() {
      return {
        // showOrderStatus: false,
        showCounter: this.showCounter,
        payInfo: {},
        payStatus: false,
        deliveryInfo: []
      };
    },

    props: ['showCounter', 'showOrderStatus', 'orderInfo'],

    methods: {
      payOrder() {
        if (this.payStatus) {
          show.show(false, "正在支付中")
          return
        }

        // 将转态置为支付中
        this.payStatus = true

        console.log('this.orderInfo', this.orderInfo.ordId);
        const ordId = this.orderInfo.ordId
        const openId = this.GLOBAL.user.wxOpenid

        var that = this;
        wx.login({
          success: function (res) {
            let code = res.code
            let data = {
              'code': code,
              'ordId': ordId
            }
            that.payInfo = data
            // 请求服务器创建付款订单
            api.createPayOrder(data, that.createSuccess, that.createErr)
          }
        });
      },

      createErr(res) {
        console.log('res', res)
        show.show(false, '创建订单失败')
        this.payStatus = false
      },

      /**
       * 订单创建成功
       * @param res
       */
      createSuccess: function (res) {
        let that = this
        console.log('res', res)
        if (res.data.status === 1) {
          let r = res.data.res
          wx.requestPayment({
            timeStamp: r.timeStamp,
            nonceStr: r.nonceStr,
            package: r.package,
            signType: 'MD5',
            paySign: r.paySign,
            success(res) {
              show.show(true, '支付成功');
              console.log('success:res', res)
              api.completePayOrder(that.payInfo, function (res) {
                console.log('支付成功！', res)
                that.payStatus = false
                wx.redirectTo({
                  url: '../orderList/main?id=' + 2
                })
              })
            },
            fail(res) {
              console.log('err:res', res)
              show.show(false, '支付已取消')
              that.payStatus = false
            }
          })
        } else {
          show.show(false, res.data.msg)
          this.payStatus = false
        }
      },

      completeOrder() {
        console.log('this.orderInfo', this.orderInfo.ordId)
        const ordId = this.orderInfo.ordId
        let that = this
        this.payInfo = {
          ordId: ordId,
          id: this.GLOBAL.user.uId
        }
        api.completePayOrder(this.payInfo, function (res) {
          console.log('支付成功！', res)
          that.payStatus = false
          wx.redirectTo({
            url: '../orderList/main?id=' + 2
          })
        })
      },

      /**
       * 取消订单
       */
      cancelOrder() {
        console.log('this.orderInfo', this.orderInfo.ordId)
        const ordId = this.orderInfo.ordId
        let data = {
          ordId: ordId,
          id: this.GLOBAL.user.uId
        }
        api.cancelOrder(data, function (res) {
          console.log('res', res)
          if (res.data.status === 1) {
            wx.redirectTo({
              url: '../orderList/main?id=' + 1
            })
            return
          } else if (res.data.status === 0) {
            show.show(false, res.data.msg)
          } else {
            show.show(false, '取消订单失败')
          }
        })
      },

      /**
       * 催单
       */
      pushOrder() {
        show.show(true, '已经通知买家')
      },

      physicalOrder() {
        let shipSn = this.orderInfo.shipSn
        let comCode = this.orderInfo.shipChannel
        let that = this
        wx.navigateTo({
          url: '../ship/main?shipSn=' + shipSn + '&comCode=' +comCode
        })
        /*wx.request({
          url: 'http://www.kuaidi100.com/autonumber/autoComNum?resultv2=1&text=' + shipSn,
          // url: 'http://www.kuaidi100.com/autonumber/autoComNum?resultv2=1&text=3379390063473',
          data: {resultv2: 1, text: shipSn},
          method: 'POST',
          success: function (res) {
            // console.log('res:true', res)
            // console.log('res.auto', res.data.auto)
            let comCode = res.data.auto[0].comCode
            wx.request({
              url: 'http://www.kuaidi100.com/query?type=' + comCode + '&postid=' + shipSn,
              // url: 'http://www.kuaidi100.com/autonumber/autoComNum?resultv2=1&text=3379390063473',
              method: 'GET',
              success: function (res) {
                let data = res.data.data;
                console.log('data', data)
                that.deliveryInfo = data
              }
            })
          },
          fail: function (res) {
            show.show(false, '查询失败')
          }
        });*/
      },

      confirmOrder() {
        const ordId = this.orderInfo.ordId
        let data = {
          ordId: ordId,
          id: this.GLOBAL.user.uId
        }
        api.confirmOrder(data, function (res) {
          console.log('res', res)
          if (res.data.status === 1) {
            wx.redirectTo({
              url: '../orderList/main?id=' + 4
            })
            return
          } else if (res.data.status === 0) {
            show.show(false, res.data.msg)
          } else {
            show.show(false, '确认收货失败')
          }
        })
      }
    }
  }
</script>

<style scoped>


  /* 物品列表 */
  .order_info {
    /* color: rgb(230, 230, 230); */
    font-size: 16px;
    /* background: seagreen; */
    /* display: inline-block; */
  }

  .order_info .goods_logo {
    width: 65%;
    padding-left: 5%;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    /* background: rgb(197, 197, 197); */
    color: gray;
    border-bottom: 1px solid rgb(230, 230, 230);
    display: inline-block;
  }

  .order_status {
    width: 25%;
    /* display: inline inline-block; */
    float: right;
    font-size: 14px;
    /* background: darkblue; */
    text-align: right;
    height: 40px;
    line-height: 40px;
    color: gray;
    padding-right: 5%;
    border-bottom: 1px solid rgb(230, 230, 230);
  }

  .goods_info {
    height: 80px;
    /* background: saddlebrown; */
    border-bottom: 1px solid rgb(230, 230, 230);
    padding: 10px;
  }

  .goods_info .goods_photo {
    margin: 0px 10px;
    height: 80px;
    width: 80px;
    float: left;
    border-radius: 5px;
    /* border: 1px solid #eee; */
    overflow: hidden;
  }

  .goods_info .goods_title {
    margin-bottom: 5px;
  }

  .goods_info .goods_size {
    color: #ccc;
    font-size: 14px;
  }

  .goods_info .goods_text {
    width: 180px;
    float: left;
  }

  .goods_info .goods_price {
    padding-right: 20px;
    /* float: right; */
    position: absolute;
    right: 0px;
    color: red;
  }

  .goods_info .goods_title {
    display: inline-block;
  }

  .goods_info .goods_size {
    display: inline-block;
  }

  .goods_info .goods_count {
    position: absolute;
    margin-right: 20px;
    margin-top: 50px;
    right: 0px;
    width: 100px;
    font-size: 18px;
    color: red;
    border: 1px solid gray;
    border-radius: 5px;
  }

  .goods_info .goods_count_show {
    position: absolute;
    margin-right: 20px;
    margin-top: 50px;
    right: 0px;
    width: 100px;
    font-size: 14px;
    border-radius: 5px;
    text-align: right;
  }

  .goods_info .goods_count .btn_count {
    width: 30%;
    height: 100%;
    display: inline-block;
    text-align: center;
    font-size: 20px;
  }

  .goods_info .goods_count .num {
    width: 38%;
    border-left: 1px solid gray;
    border-right: 1px solid gray;
    font-size: 20px;
  }

  .combined {
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid rgb(230, 230, 230);
    /* background: darksalmon; */
    padding: 0px 20px;
  }

  .shop_comb {
    display: inline-block;
    position: absolute;
    left: 20px;
    font-size: 14px;
  }

  .allPrice {
    display: inline-block;
    position: absolute;
    right: 20px;
    color: RED;
  }

  .btn {
    float: right;
    border-radius: 3px;
    padding: 2px 10px;
    margin-left: 10px;
  }

  .pay {
    background: rgb(255, 0, 76);
    border: 1px solid rgb(255, 0, 76);
  }

  .cancel {
    /*background: rgb(255, 0, 76);*/
    border: 1px solid #2c2c2c;
    color: #2c2c2c;
  }
  .confirm{
    border: 1px solid #007700;
    color: #007700;
  }

  .foot_option_button {
    border-bottom: 1px solid rgb(230, 230, 230);
    float: right;
    /*background: rgb(255, 0, 76);*/
    color: white;
    width: 100%;
    text-align: center;
    padding: 10px 20px;
    /*margin-bottom: 20px;*/
    border-bottom: 10px solid rgb(230, 230, 230);

  }

  .foot_option .foot_price {
    margin-left: 20px;
    float: left;
    font-size: 12px;
  }

  .foot_option .foot_price .foot_price_price {
    color: red;
    font-size: 16px;
  }

  .foot_option .foot_count {
    float: right;
    font-size: 12px;
  }

  .foot_option .foot_submit {
    float: right;
    height: 100%;
    width: 38%;
    color: white;
    background: rgb(255, 0, 76);
    text-align: center;
    margin-left: 10px;
  }
</style>


