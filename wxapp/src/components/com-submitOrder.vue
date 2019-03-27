<template>
    <div class="shopCarInfo" v-if="orderInfo.goodsList.length > 0">
      <splitter />
      <div class="goods_logo">{{shopName}}</div>

      <div class="goods_list">

        <block v-for="(item, index) in orderInfo.goodsList" :key="index" :index="index">
          <div class="goods_info">
              <!-- <image class="goods_selected" @click="updateStatus(index)" :src="item.selected == true ? '../../static/img/icon/picked.png' : '../../static/img/icon/pick.png'" /> -->
              <image class="goods_photo" :src="item.goods.imgUrl" />
              <div class="goods_text">
                  <div class="goods_title">{{item.goods.title}}</div>
                  <!--<div class="goods_size">{{item.size}}</div>-->
                  <!--<div class="goods_size">{{orderInfo.size.text}}</div>-->
                  <div class="goods_size">{{item.size.text}}</div>
              </div>

              <div v-if="showCounter" class="goods_count">
                  <div class="sub btn_count" @click="sub(index)">-</div>
                  <div class="num btn_count" :v-text="count">{{item.count}}</div>
                  <div class="add btn_count" @click="add(index)">+</div>
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
            <div class="allPrice float_right">￥{{orderInfo.price}}</div>
        </div>
        <div class="buyMsg">
          <view class="weui-cells__title">订单信息</view>
          <view class="weui-cells weui-cells_after-title">

              <view class="weui-cell weui-cell_input">
                <view class="weui-cell__hd">
                    <view class="weui-label">邮费</view>
                </view>
                <view class="weui-cell__bd">
                    <div class="weui-input">￥10元</div>
                </view>
              </view>

              <view class="weui-cell weui-cell_input">
                <view class="weui-cell__hd">
                    <view class="weui-label">买家留言</view>
                </view>
                <view class="weui-cell__bd">
                    <input class="weui-input" placeholder="选填：填写内容已和买家协商确认"/>
                </view>
              </view>
          </view>
        </div>
    </div>
</template>

<script>
import Splitter from "@/components/splitter";
export default {
  components: { Splitter },
  data() {
    return {
      showOrderStatus: false,
      showCounter: this.showCounter,
      shopName: '读取中..',

      orderInfo: {},

      orderInfo1: {
        ordId: 1,
        status: 0,
        price: 999,
        shopName: '牛牛商店',
        count: 9,
        createTime: '2018-08-08 18:88:88',
        itemList: [{
            id: 1,
            size: '颜色：1:1条纹；白色',
            count: 10,
            selected: false,
            goods: {
              id: 1,
              title: '2018款黑心坐垫',
              photo: '../../static/img/swiper/pic01.jpg',
              price: 88.90
            }
          },
          {
            id: 2,
            size: '颜色：10:1条纹；黑色',
            count: 5,
            selected: true,
            goods: {
              id: 1,
              title: '宝马M方向盘',
              photo: '../../static/img/swiper/pic01.jpg',
              price: 99.9
            }
          },
          {
            id: 1,
            size: '颜色：1:1条纹；白色',
            count: 10,
            selected: false,
            goods: {
              id: 1,
              title: '2018款黑心坐垫',
              photo: '../../static/img/swiper/pic01.jpg',
              price: 88.90
            }
          }
        ]
      }
    };
  },

  props: ['showCounter', 'orderInfo'],

  methods: {},

  computed: {
    getAllPrice() {
      let goodsList = this.orderInfo.goodsList;
      let allPrice = 0;
      let allCount = 0;

      console.log("this.orderInfo-----com-sub");
      console.log(this.orderInfo);

      this.shopName = this.orderInfo.goodsShopInfo.name;

      // 遍历是否选中，计算价格
      for (let i = 0; i < goodsList.length; i++) {
        // if (itemList[i].selected) {
        allPrice += goodsList[i].count * goodsList[i].goods.price;
        allCount += goodsList[i].count;
        // }
      }
      // 显示价格
      this.orderInfo.price = allPrice.toFixed(2);
      this.orderInfo.count = allCount;
    },
  },
};
</script>

<style>

.adderss {
  height: 50px;
  line-height: 50px;
  /* background: rgb(235, 235, 235); */
  border-top: 1px solid rgb(230, 230, 230);
  padding-left: 20px;
}


/* 物品列表 */
.shopCarInfo {
  /* color: rgb(230, 230, 230); */
  font-size: 16px;
  /* background: seagreen; */
  /* display: inline-block; */
}

.shopCarInfo .goods_logo {
  width: 95%;
  padding-left: 5%;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  /* background: rgb(197, 197, 197); */
  color: gray;
  border-bottom: 1px solid rgb(230, 230, 230);
  display: inline-block;
}

.order_status{
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

.goods_selected_div{
  /* height: 100%; */
  background: firebrick;
}
.goods_selected{
  margin: 25px 0px;
  height: 30px;
  width: 30px;
  float: left;
  /* border-radius: 5px; */
  /* border: 1px solid #eee; */
  /* overflow: hidden; */
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
  float: left;
  color: #ccc;
  font-size: 14px;
}

.goods_info .goods_text {
  width: 150px;
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
  width: 180px;
  height: 45px;
  overflow: hidden;
}
.goods_info .goods_size {
  display: inline-block;
  width: 110px;
}

.goods_info .goods_count {
  position: absolute;
  margin-right: 20px;
  margin-top: 50px;
  right: 0px;
  width: 100px;
  font-size: 18px;
  color: gray;
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
  font-size: 18px;
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

.foot_option {
  height: 50px;
  width: 100%;
  position: fixed;
  bottom: 0px;
  font-size: 16px;
  border-top: 1px solid rgb(230, 230, 230);
  line-height: 50px;
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


