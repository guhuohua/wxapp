<template>
  <view class="page">
    <view class="page__bd">
      <view class="weui-tab">
        <view class="weui-navbar">
          <block v-for="(item, index) in tabs" :index="index" :key="index">
            <view :id="index" class="'weui-navbar__item ' + activeIndex == index ? 'weui-bar__item_on' : ''"
                  @click="tabClick">
              <view class="weui-navbar__title">{{item}}</view>
            </view>
          </block>
          <view class="weui-navbar__slider"
                :style="'left: ' + sliderLeft + 'px; transform: translateX(' + sliderOffset + 'px); -webkit-transform: translateX(' + sliderOffset + 'px);'"></view>
        </view>
        <view class="weui-tab__panel" style="overflow: hidden;">

          <view class="weui-loadmore weui-loadmore_line" v-if="orderInfo.length == 0">
            <view class="weui-loadmore__tips weui-loadmore__tips_in-line">暂无数据</view>
          </view>

          <block v-for="(item, index) in orderInfo" :index="index" :key="index">
            <com_orderlist :showCounter="false" :showOrderStatus="true" :orderInfo="orderInfo[index]"></com_orderlist>
          </block>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import Splitter from "@/components/com-splitter.vue";
  import com_orderlist from "@/components/com-orderList";
  import api from '../../api/api-order'

  export default {
    // 声明组件
    components: {Splitter, com_orderlist},

    data() {
      return {
        sliderWidth: 75,
        tabs: ["待付款", "待发货", "已发货", "已完成", "全部订单"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0,
        orderInfo: []

        /*
        orderInfo: [{
          ordId: 1,
          orderStatus: 1,
          orderPrice: 999,
          shopName: '牛牛商店',
          count: 9,
          createTime: '2018-08-08 18:88:88',
          itemList: [{
            id: 1,
            size: '颜色：1:1条纹；白色',
            count: 10,
            goods: {
              id: 1,
              title: '2018款黑心坐垫',
              photo: '../../static/img/swiper/pic01.jpg',
              price: 818.90
            }
          },
            {
              id: 2,
              size: '颜色：10:1条纹；黑色',
              count: 5,
              goods: {
                id: 1,
                title: '宝马M方向盘',
                photo: '../../static/img/swiper/pic01.jpg',
                price: 299.9
              }
            }
          ]
        },
          {
            ordId: 1,
            orderStatus: 2,
            orderPrice: 999,
            shopName: '牛牛商店',
            count: 9,
            createTime: '2018-08-08 18:88:88',
            itemList: [{
              id: 1,
              size: '颜色：1:1条纹；白色',
              count: 10,
              goods: {
                id: 1,
                title: '2018款黑心坐垫',
                photo: '../../static/img/swiper/pic01.jpg',
                price: 588.90
              }
            },
              {
                id: 2,
                size: '颜色：10:1条纹；黑色',
                count: 5,
                goods: {
                  id: 1,
                  title: '宝马M方向盘',
                  photo: '../../static/img/swiper/pic01.jpg',
                  price: 99.9
                }
              }
            ]
          },
          {
            ordId: 1,
            orderStatus: 3,
            orderPrice: 999,
            shopName: '牛牛商店',
            count: 9,
            createTime: '2018-08-08 18:88:88',
            itemList: [{
              id: 1,
              size: '颜色：1:1条纹；白色',
              count: 1,
              goods: {
                id: 1,
                title: '2018款黑心坐垫',
                photo: '../../static/img/swiper/pic01.jpg',
                price: 188.90
              }
            },
              {
                id: 2,
                size: '颜色：10:1条纹；黑色',
                count: 5,
                goods: {
                  id: 1,
                  title: '宝马M方向盘',
                  photo: '../../static/img/swiper/pic01.jpg',
                  price: 929.9
                }
              }
            ]
          }
        ]
        */
      };
    },


    methods: {
      changeTab(index) {
        console.log(index);
        this.activeIndex = index;
        this.sliderLeft = 20 * this.sliderLeft;
      },

      tabClick: function (e) {
        this.sliderOffset = e.currentTarget.offsetLeft;
        this.activeIndex = e.currentTarget.id;
        console.log(this.activeIndex);
        this.orderInfo = {};
        this.getOrderList(this.activeIndex)
      },


      getOrderList(index) {
        let that = this;
        // let url = "http://localhost:8080/order/select/1/" + index;
        // console.log(url);
        let id = this.GLOBAL.user.uId
        api.getOrderList(id, index, function (res) {
          let data = res.data;
          if (data.status == 1) {
            that.orderInfo = data.res;
            console.log("订单数量：" + that.orderInfo.length);
            console.log(that.orderInfo);
          }
        })
      }
    },

    onLoad: function (option) {
      console.log(option);
      this.activeIndex = option.id - 1;

      var that = this;

      wx.getSystemInfo({
        success: function (res) {
          console.log("res");
          console.log(res.windowWidth);
          that.sliderWidth = parseInt(res.windowWidth / that.tabs.length);
          console.log(that.sliderWidth);

          that.sliderLeft = (res.windowWidth / that.tabs.length - that.sliderWidth) / 2,
          that.sliderOffset = (res.windowWidth - 50) / that.tabs.length * that.activeIndex;

          that.getOrderList(that.activeIndex)
        }
      });

    }
  };
</script>

<style>
  .tab_title {
    line-height: 40px;
    width: 20%;
    height: 40px;
    text-align: center;
    font-size: 14px;
  }

  .tab_bottom {
    background: #1aad19;
    width: 20%;
    height: 5px;
  }
</style>


