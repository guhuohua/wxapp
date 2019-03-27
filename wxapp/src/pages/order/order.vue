<template>
  <div class="body">
    <div @click="toAddNewAddress" :class="'adderss' + (haveAddr ? ' haveAddress' : '')">
      <!--<div v-if="haveAddr" style="font-size: 16px; line-height: 20px;">
        <div style="display: inline-block;">联系人：{{addr.nikename}}</div>
        <div style="display: inline-block; position: absolute; right: 20px;">{{addr.tel}}</div>
        <div style="font-size: 13px;">收货地址：{{addr.area}},{{addr.addr}}</div>
      </div>-->
      <!--// console.log(res.userName)
      // console.log(res.postalCode)
      // console.log(res.provinceName)
      // console.log(res.cityName)
      // console.log(res.countyName)
      // console.log(res.detailInfo)
      // console.log(res.nationalCode)
      // console.log(res.telNumber)
      // console.log('res', res)-->
      {{addrText}}
      <div v-if="address.hasAddress" style="font-size: 16px; line-height: 20px;">
        <div style="display: inline-block;">联系人：{{address.userName}}</div>
        <div style="display: inline-block; position: absolute; right: 20px;">{{address.telNumber}}</div>
        <div style="font-size: 13px;">收货地址：{{address.provinceName + '-' + address.cityName + '-' +
          address.countyName}},{{address.detailInfo}}
        </div>
      </div>
    </div>
    <block v-for="(item, index) in order" :key="index" :index="index">
      <Com_submitOrder :showCounter="false" :orderInfo="item"></Com_submitOrder>
    </block>
    <Com_splitter :h="100" :bgcolor="'FFF'"></Com_splitter>

    <div class="foot_option">
      <div class="foot_price"><span class="foot_price_text">总价：</span><span
        class="foot_price_price">￥{{allPrice}}</span></div>
      <div class="foot_submit" @click="submitOrder">提交订单</div>
      <div class="foot_count">共{{allCount}}件商品</div>
    </div>
  </div>
</template>

<script>
  import Com_shopCar from '@/components/com-shopCar'
  import Com_submitOrder from '@/components/com-submitOrder'
  import Com_splitter from '@/components/com-splitter'
  import api from '../../api/api-order'
  import api_shop from '../../api/api-shop'
  import show from '../../api/show-result'

  export default {
    components: { Com_shopCar, Com_splitter, Com_submitOrder },

    data() {
      return {
        // 当前订单
        order: [],
        postMoney: 10.00,

        // shop
        shopInfo: [],

        allCount: 0,
        allPrice: 0,
        haveAddr: false,
        addrText: '请填写收货地址 >',
        addr: {},
        address: {
          hasAddress: false,
          userName: '',
          postalCode: '',
          provinceName: '',
          cityName: '',
          countyName: '',
          detailInfo: '',
          nationalCode: '',
          telNumber: ''
        },
        orderList: []
      };
    },

    methods: {
      sub: function () {
        this.count = this.count - 1;
        console.log("sub:" + this.count);
        console.log(parseInt(this.count));
      },

      add: function () {
        this.count = this.count + 1;
        console.log("add:" + this.count);
        console.log(parseInt(this.count));
      },

      toAddNewAddress() {
        let that = this
        wx.chooseAddress({
          success(res) {
            that.address.hasAddress = true
            that.address.userName = res.userName
            that.address.postalCode = res.postalCode
            that.address.provinceName = res.provinceName
            that.address.cityName = res.cityName
            that.address.countyName = res.countyName
            that.address.detailInfo = res.detailInfo
            that.address.nationalCode = res.nationalCode
            that.address.telNumber = res.telNumber
          }, fail(res) {
            if (that.address.hasAddress == false) {
              show.show(false, '请选择收货地址');
              that.addrText = '请填写收货地址 >'
            }
          }
        })
        console.log('that.address.', that.address)
      },

      submitOrder() {
        let that = this;

        if (!that.address.hasAddress) {
          this.toAddNewAddress()
        }
        // 判断是否选择收货地址
        // if ('addr' in this.addr) {
        if (that.address.hasAddress) {
          let args = {
            id: this.GLOBAL.user.uId,
            order: that.order,
            addr: that.addr,
            address: that.address
          };
          console.log('args', args);
          api.orderSubmit(args, function (res) {
              console.log(res);
              if (res.data.status == 1) {

                // 添加成功，重定向到订单页面
                wx.redirectTo({
                  url: "../orderList/main?id=1"
                });

                // 显示提示信息
                wx.showToast({
                  title: '订单提交成功',
                  icon: 'success',
                });
                that.GLOBAL.showCarRefresh = true

              } else {
                wx.showToast({
                  title: '操作失败！',
                  // icon: 'none'
                  image: '../../static/img/icon/err.png'
                });
              }
            },
            //失败
            function (res) {
              wx.showToast({
                title: '操作失败！',
                // icon: 'none'
                image: '../../static/img/icon/err.png'
              });
            }
          );
        } else {
          this.toAddNewAddress()
        }
      }
    },

    // 动态显示地址
    computed: {
      // 动态计算是否显示
      showAddress() {
        // if (this.haveAddr) {
        //   this.addrText = ''
        // }
        if (this.address.hasAddress) {
          this.addrText = ''
        } else {
          this.addrText = '请填写收货地址 >'
        }
      },

      getAllprice() {

        let orderList = this.order;
        let allCount = 0;
        let allPrice = 0;

        console.log("最总结算：-------");
        console.log(orderList);
        console.log("最总结算：-------");


        for (var i = 0; i < orderList.length; i++) {
          allCount += orderList[i].count;
          allPrice += parseFloat(orderList[i].price)
          // console.log(orderList[i].ordId + ", " + orderList[i].price)
        }


        this.allCount = allCount;
        this.allPrice = (allPrice + this.postMoney).toFixed(2);
      }
    },

    onShow() {
      // 获取当前页面的原始页面
      let pages = getCurrentPages()
      let currPage = pages[pages.length - 1]
      this.haveAddr = false;

      // 判断是否是回调页面
      // if ('addr' in currPage.data) {
      //   this.haveAddr = currPage.data.haveAddr
      //   this.addr = currPage.data.addr
      //   console.log('this.addr', this.addr)
      // }
    },

    onLoad: function (options) {
      let that = this;

      console.log(options);
      this.count = 1;
      if (!this.address.hasAddress) {
        this.addrText = '请填写收货地址 >';
      }
      console.log("跳转： order");

      // 获取全局中的order信息
      console.log(this.GLOBAL.order);
      this.order = this.GLOBAL.order;

      //预先获取地店铺信息
      let shopIdList = [];
      for (let i = 0; i < this.order.length; i++) {

        // 需要判断该订单是否有数据
        if (this.order[i].goodsList.length > 0) {
          shopIdList.push(parseInt(this.order[i].goodsList[0].goods.shopId));
        }
      }

      api_shop.getShopInfoByIds(shopIdList, function (res) {
        let data = res.data;
        // console.log(res);
        if (data.status == 1) {
          that.shopInfo = data.res;

          // 将 店铺信息置入订单对象
          for (let i = 0; i < that.order.length; i++) {
            let ord = that.order[i];

            // 需要判断是否大于有数据
            if (ord.goodsList.length > 0) {
              let id = ord.goodsList[0].goods.shopId;
              for (let j = 0; j < that.shopInfo.length; j++) {
                if (id == that.shopInfo[j].shopId) {
                  that.order[i].goodsShopInfo = that.shopInfo[j];
                  break;
                }
              }
            }
          }
        }
      }, function () {

      });

    }
  };
</script>

<style>

  /* 如果有地址选择 */

  .adderss {
    height: 50px;
    line-height: 20px;
    /* line-height: 50px; */
    /* background: rgb(235, 235, 235); */
    border-top: 1px solid rgb(230, 230, 230);
    padding-left: 20px;
    padding-top: 10px;
  }

  .haveAddress {
    /* line-height: 20px; */
    /* width: 100%; */
    padding: 15px 20px;
  }

  /* 物品列表 */
  .order_info {
    /* color: rgb(230, 230, 230); */
    font-size: 16px;
    /* background: seagreen; */
  }

  .order_info .goods_logo {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    padding-left: 20px;
    /* background: rgb(197, 197, 197); */
    color: gray;
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
  }

  .allPrice {
    display: inline-block;
    position: absolute;
    right: 20px;
    color: RED;
  }

  .foot_option {
    height: 50px;
    width: 100%;
    position: fixed;
    bottom: 0px;
    font-size: 16px;
    border-top: 1px solid rgb(230, 230, 230);
    line-height: 50px;
    background: #ffffff;
    z-index: 999;
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


