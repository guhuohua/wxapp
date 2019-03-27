<template>
  <div class="body">
    <!-- <BlockSplitter v-if="orderList.length > 0"/> -->
    <!-- <div class="list">
      分隔条
      <block v-for='(item, index) in itemList' :index='index' :key='index'>
        <ShopCarItem :item="item" @getChildPrice="getPrice" @delChild="delChild"/>
        <LineSplitter />
       </block>
    </div> -->
    <view class="weui-loadmore weui-loadmore_line" v-if="orderList.length == 0">
      <view class="weui-loadmore__tips weui-loadmore__tips_in-line">暂无数据</view>
    </view>
    <block v-for="(item, index) in orderList" :key="index" :index="index">
      <Com_shopCar :showCounter="true" :orderInfo="item"></Com_shopCar>
    </block>
    <Com_splitter :h="100" :bgcolor="'FFF'"></Com_splitter>


    <!-- 底部结算 -->
    <div class="settlement">
      <image class="foot allPick" @click="allPick"
             :src="selectAll == true ? '../../static/img/icon/picked.png' : '../../static/img/icon/pick.png'"/>
      <div class="foot pick">全选({{selectCount}})</div>
      <div class="foot btn" @click="submit">结算</div>
      <div class="foot btn_del" @click="del">删除</div>
      <div class="foot price">￥{{selectPrice}}</div>
    </div>
  </div>
</template>

<script>

  import BlockSplitter from '@/components/splitter'
  import LineSplitter from '@/components/splitter-line'
  import ShopCarItem from '@/components/shopcar-item'
  import Com_shopCar from '@/components/com-shopCar'
  import Com_splitter from '@/components/com-splitter'
  import api from '../../api/api-order'
  import show from "../../api/show-result";

  export default {

    components: {ShopCarItem, BlockSplitter, LineSplitter, Com_shopCar, Com_splitter},

    data() {
      return {
        // orderList: [1,2,3,4,5,6,7,8,9],
        msg: '购物车',
        showList: [],
        selectCount: 0,
        selectPrice: 0,
        selectAll: false,
        orderList: []
      }
    },

    /*
      {
        "price": "57.60",
        "count": 2,
        "goodsList": [
          {
            "goods": {
              "title": "专用于朗动 内饰闪光膜碳纤贴膜 改装贴车内贴纸 中控碳纤维贴纸",
              "price": 28.8,
              "oriPrice": 37.44,
              "sales": 93,
              "imgUrl": "http://localhost:8080/image/goods/pic09.jpg",
              "repertory": 239,
              "status": 1,
              "hot": 1,
              "keyword": "导航",
              "type": 1,
              "createTime": 1534747997024,
              "shopId": "101",
              "gflag": "mxXXtfWfMFhXxzj0",
              "gid": 29
            },
            "count": 2,
            "size": {
              "gsId": 83,
              "text": "灰色",
              "url": "http://localhost:8080/image/goods/pic09.jpg",
              "status": 1,
              "createTime": 1534752498115,
              "gflag": "mxXXtfWfMFhXxzj0"
            },
            "sizeText": "灰色"
          }
        ],
        "goodsShopInfo": {
          "shopId": 101,
          "name": "球球二号店",
          "url": "zH2tQbPFBjKHbxbM",
          "status": 1,
          "createTime": 1534769726398
        }
      }]
    */

    methods: {
      getPrice: function (res) {
        this.selectPrice += res.price
        this.selectCount += res.count
        console.log(res)
      },

      delChild: function (item) {
        // console.log('子节点 删除：' + this.item)
        var newList = []
        for (var i = 0; i < this.itemList.length; i++) {
          console.log(this.itemList[i].id + ', ' + item.id)
          if (this.itemList[i].flag !== item.flag) {
            newList.push(this.itemList[i])
          }
        }
        console.log(this.itemList)
        this.showList = newList
        this.itemList = newList
        console.log(newList)
        console.log(this.itemList)
      },

      allPick: function () {
        this.selectAll = !this.selectAll
        let len = this.orderList.length
        // console.log("orderList.lenth" + len)
        // 遍历所有数据，更新选中状态
        for (var i = 0; i < len; i++) {
          let order = this.orderList[i]
          for (var j = 0; j < order.itemList.length; j++) {
            order.itemList[j].selected = this.selectAll
          }
        }
      },

      // 删除所有勾选的物品
      del: function () {
        let len = this.orderList.length
        let uId = this.GLOBAL.user.uId

        let delList = []
        // 遍历所有数据，
        for (var i = 0; i < len; i++) {

          // 获取单个列表信息
          let order = this.orderList[i]
          for (var j = order.itemList.length - 1; j >= 0; j--) {
            if (order.itemList[j].selected) {
              // console.log("removeLast:" + order.itemList[j].selected)
              let item = order.itemList.splice(j, 1)
              delList.push({
                gflag: item[0].goods.gflag,
                sizeId: item[0].sizeId
              })
            }
          }
        }
        console.log('delList', delList);

        // 判断是否有选择商品
        if (delList.length == 0) {
          wx.showToast({
            title: '请先选择商品',
            // icon: 'none'
            image: '../../static/img/icon/err.png'
          });
          return;
        }

        if (this.GLOBAL.user.uId === undefined) {
          this.GLOBAL.userErrMsg = '请登录后使用'
          wx.switchTab({
            url: '../user/main'
          })
          return
        }

        api.deleteShopCarItem({
            uId: uId,
            list: delList
          }, function (res) {
            if (res.data.status == 1) {
              show.show(true, "操作成功！");
            } else {
              show.show(false, "操作失败！")
            }
          }, function () {
            show.show(false, "操作失败！")
          }
        )
      },

      // 获取生成订单数据
      submit: function () {
        let orderList = this.orderList;
        let len = orderList.length;
        console.log("shopcar------------1");
        console.log(orderList);

        let list = [];

        for (let i = 0; i < len; i++) {
          let order = orderList[i];

          // 初始信息
          let goodsList = [];

          // 遍历所有的物品，筛选选择的商品
          let itemList = order.itemList;

          let selectedCount = 0;

          // 提取需要的数据
          for (let j = 0; j < itemList.length; j++) {
            let item = itemList[j];
            if (item.selected) {
              selectedCount++;
              let goodsInfo = {};

              // 填充信息
              let goods = item.goods;
              goodsInfo.goods = goods;
              goodsInfo.count = item.count;
              goodsInfo.size = item.size;
              goodsInfo.sizeText = item.size.name;
              goodsList.push(goodsInfo);
            }
          }

          // 加入订单列表
          // 需判断订单内是否有已选中的商品
          if (selectedCount > 0) {
            list.push({
              // 订单总数
              count: 0,
              //订单总价格
              price: 0,
              goodsList: goodsList,
              goodsShopInfo: {}
            });
          }
        }


        // 判断是否有选择商品
        if (list.length == 0) {
          wx.showToast({
            title: '请先选择商品',
            // icon: 'none'
            image: '../../static/img/icon/err.png'
          });
          return;
        }


        this.GLOBAL.order = list;
        // 跳转到提交界面
        wx.navigateTo({
          url: "../order/main"
        });
      },

      getShopCarList: function () {

        let that = this;
        wx.showNavigationBarLoading(); //在标题栏中显示加载
        wx.showLoading({
          title: '数据加载中',
        });

        // 用户id
        let uid = this.GLOBAL.user.uId;

        api.getShopCarList(uid,

          function (res) {
            let data = res.data;
            // console.log(data);
            if (data.status == 1) {
              that.orderList = data.res;
              console.log(data.res);
            }
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
            wx.hideLoading();
          },
          // 失败
          function () {
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
            wx.hideLoading();
          })

        // 刷新完成
        this.GLOBAL.showCarRefresh = false
      }
    },


    computed: {
      // 动态计算总价格
      getAllPrice() {
        let orderList = this.orderList
        let allCount = 0
        let allPrice = 0
        for (var i = 0; i < orderList.length; i++) {
          allCount += orderList[i].count
          allPrice += parseFloat(0 + orderList[i].price)
          // console.log(orderList[i].ordId + ", " + orderList[i].price)
        }
        this.selectCount = allCount
        this.selectPrice = allPrice.toFixed(2)
        // console.log(allPrice)
      }
    },

    onLoad() {
      //获取用户购物车信息列表
      this.getShopCarList();
    },

    onShow() {
      if (this.GLOBAL.showCarRefresh) {
        this.getShopCarList();
      }
    },

    onHide() {
      console.log('页面隐藏了');
    },
    // 下拉刷新
    onPullDownRefresh() {
      this.getShopCarList()
    }
  }
</script>

<style scoped>
  .settlement {
    position: fixed;
    width: 100%;
    height: 55px;
    bottom: 0px;
    font-size: 18px;
    background: rgb(235, 235, 235);
    line-height: 55px;
  }

  .foot {
    display: inline-block;
  }

  .allPick {
    float: left;
    margin-top: 17.5px;
    margin-left: 10px;
    margin-right: 10px;
    width: 20px;
    height: 20px;
  }

  .pick {
    float: left;
    font-size: 14px;
    color: gray;
  }

  .btn {
    font-size: 16px;
    color: white;
    float: right;
    right: 0px;
    padding: 0px 25px;
    height: 150px;
    background: rgb(255, 0, 76);
  }

  .btn_del {
    font-size: 16px;
    color: white;
    float: right;
    right: 0px;
    padding: 0px 25px;
    height: 150px;
    background: orangered;
  }

  .price {
    float: right;
    margin-right: 10px;
    color: red;
    font-size: 14px;
  }
</style>
