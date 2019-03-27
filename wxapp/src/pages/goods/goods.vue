<template>
  <div class='page_hd'>

    <!-- 加入购物车 弹出层 -->
    <div class="jionShopCar" v-if="showBox">
      <div class="btn_close" @click="closeInfo">
        <image src="../../static/img/icon/guanbi.png"></image>
      </div>
      <div class="bg">
        <image :src="sizes[sizeFlag].url || goods.imgUrl"/>
        <div class="goodsInfo">
          <div class="info_price">￥{{goods.price}}</div>
          <div v-if="sizeText">已选：{{sizeText}}，{{count}}件</div>
        </div>
        <SplitterLine/>
        <div class="info_size">
          <div>规格</div>
          <block v-for="(size, index) in sizes" :index="index" :key="index">
            <div class="btn_size" :class="sizeFlag == index ? ' btn_size_selected' : ''" @click="updateSize(index)">
              {{size.text}}
            </div>
          </block>
        </div>
        <SplitterLine/>
        <div class="info_count">
          <div class="info_count_title">数量</div>
          <div class="option">
            <div class="small sub" @click="sub">-</div>
            <div class="small num">{{count}}</div>
            <div class="small add" @click="add">+</div>
          </div>
        </div>
        <SplitterLine/>
        <div class="btn_ok" @click="startbuy">确定</div>
      </div>
    </div>

    <scroll-view>
      <!-- 多图片滑动查看 -->
      <div class='title_swiper'>
        <swiper class='swiper_banner' indicator-dots='true'>
          <block v-for='(item, index) in imgUrls' :index='index' :key='index'>
            <swiper-item>
              <!--<image :src='item' class='slide-image' mode='aspectFill'/>-->
              <image :src='item.url' class='slide-image'/>
            </swiper-item>
          </block>
        </swiper>
      </div>

      <div class="page_bd">
        <!-- 现价 -->
        <span class="RMB_flag">￥</span><span class="goods_price_originalPrice">{{goods.price}}</span>

        <!-- 原价 -->
        <span class="goods_price">￥{{goods.oriPrice}}</span>
        <!--<div class="share" @click="toShare" >-->
        <button open-type='share' class="shareButton iconfont">&#xe60f;
          <!--<image src="../../static/img/icon/share.png"/>-->
          <!--<image src="../../static/img/icon/share.png" open-type='share' />-->
        </button>
        <!--</div>-->

        <!-- 价格+标题 -->
        <div class="goods_title">{{goods.title}}</div>
      </div>

      <!-- 分隔条 -->
      <splitter/>
      <div class="goodsDetails" v-html="details.text"></div>
      <div>{{option}}</div>
      <!-- 底部操作栏 -->
      <div class="foot_option">
        <!-- 客服 -->
        <div class="customer_service small">
          <image src="../../static/img/icon/kefu.png"/>
          <span>客服</span>
        </div>
        <div class="shopcar small" @click="tiShopCar">
          <image src="../../static/img/icon/shopcar.png"/>
          <span>购物车</span>
        </div>
        <div class="join" @click="addShopCar(0)">加入购物车</div>
        <div class="buy" @click="addShopCar(1)">立即购买</div>
      </div>
    </scroll-view>

  </div>
</template>

<script>
  // 载入组件
  import Splitter from '@/components/splitter'
  import SplitterLine from '@/components/splitter-line'
  import api from '../../api/api-goods'

  export default {
    // 声明组件
    components: {Splitter, SplitterLine},
    data() {
      return {
        snId: '',
        showBox: false,
        flag: 0,
        goodsInfoPic: '../../static/img/swiper/pic01.jpg',
        count: 1,
        sizeText: '',
        sizeFlag: 0,
        goods: {},
        sizes: [],
        imgUrls: [],
        details: {}
      }
    },

    methods: {
      closeInfo() {
        this.showBox = false
      },

      tiShopCar() {
        wx.switchTab({
          url: '../shopcar/main'
        })
      },

      addShopCar(flag) {
        this.flag = flag;
        this.showBox = !this.showBox;
      },

      // 点击购买
      startbuy() {

        if (this.GLOBAL.user.uId === undefined) {
          this.GLOBAL.userErrMsg = '请登录后使用'
          wx.switchTab({
            url: '../user/main'
          })
          return
        }

        let that = this;
        this.showBox = false;
        let order = [];
        if (this.flag == 0) {

          let shopcar = {
            uid: that.GLOBAL.user.uId,
            count: that.count,
            gflag: that.goods.gflag,
            shopId: that.goods.shopId,
            size: that.sizes[that.sizeFlag].gsId
          };

          // 添加到购物车
          api.addToShopCar(shopcar, function (res) {
            console.log(res);
            if (res.data.status == 1) {

              // 设置购物车界面刷新
              that.GLOBAL.showCarRefresh = true
              wx.showToast({
                title: '添加成功！',
                icon: 'success'
              });

            } else {
              wx.showToast({
                title: '操作失败！',
                // icon: 'none'
                image: '../../static/img/icon/err.png'
              });
            }
          }, function (res) {
            wx.showToast({
              title: '操作失败！',
              // icon: 'none'
              image: '../../static/img/icon/err.png'
            });
          });


        } else {

          // 直接购买
          let goodsList = [];
          let goodsInfo = {
            goods: that.goods,
            count: that.count,
            size: that.sizes[that.sizeFlag],
            sizeText: that.sizeText
          };
          goodsList.push(goodsInfo);
          order.push({
            // 订单总数
            id: that.GLOBAL.user.uId,
            uid: that.GLOBAL.user.uId,
            count: that.count,

            //订单总价格
            price: (that.count * that.goods.price).toFixed(2),
            goodsList: goodsList,
            goodsShopInfo: {}
          });

          that.GLOBAL.order = order;
          wx.navigateTo({
            url: '../order/main'
          })
        }
      },

      // 弹出层 更新状态
      updateSize(index) {
        let size = this.sizes[index];
        this.sizeText = size.text;
        this.sizeFlag = index;
      },

      add() {
        this.count = this.count + 1
      },

      sub() {
        this.count = this.count - 1
      },

      // 分享
      toShare() {
        console.log('点击', '点击');
        wx.showShareMenu({
          withShareTicket: true
        })
      }
    },

    onShareAppMessage(option) {
      console.log('option', option)
      return {
        title: this.goods.title,
        path: '/pages/goods/main?id=' + this.snId + '&uid=1',
        imageUrl: this.goods.imgUrl,
        success(res) {
          console.log(res.shareTickets[0]) // 奇怪为什么 shareTickets 是个数组？这个数组永远只有一个值。
        }
      }
    },

    onLoad(option) {
      console.log(option);
      this.showBox = false;
      this.count = 1;
      this.sizeFlag = 0;
      this.sizeText = '';
      this.imgUrls = [];

      let that = this;

      // 获取商品信息
      api.getGoodsInfoByFlag(option.id, function (res) {
        that.snId = option.id
        let data = res.data;
        console.log("data-----------");
        console.log(data);
        if (data.status == 1) {
          that.goods = data.res.goods
          that.imgUrls = data.res.imgUrls
          if (that.imgUrls.length === 0) {
            that.imgUrls.push(that.goods.imgUrl)
          }
          that.sizes = data.res.sizes;
          that.details = data.res.details || ''
        }
      });


      //获取商品规格信息
      // api.getGoodsSizeInfo(option.id, function (res) {
      //   let data = res.data;
      //   // console.log(data);
      //   if (data.status == 1) {
      //     that.sizes = data.res;
      //   }
      // });
    }
  }
</script>

<style scoped>


  .goodsDetails image {
    width: 100%;
  }

  .jionShopCar {
    position: fixed;
    margin-top: 20%;
    height: 70%;
    width: 100%;
    background: rgb(255, 255, 255);
    z-index: 999;
    bottom: 0px;
  }

  .jionShopCar image {
    width: 100px;
    height: 100px;
    position: relative;
    top: -20px;
    margin-left: 20px;
    border: 1px solid gray;
    background: white;
  }

  .btn_close {
    float: right;
    width: 30px;
    height: 30px;
    margin-right: 35px;
    margin-top: 30px;
  }

  .btn_close image {
    width: 30px;
    height: 30px;
    border: 0px;
  }

  .goodsInfo {
    display: inline-block;
    margin-left: 20px;
    position: relative;
    top: -50px;
  }

  .info_price {
    color: red;
    font-size: 18px;
  }

  .info_size {
    margin-left: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .info_count {
    margin-left: 20px;
    padding: 5px 0px;
    height: 40px;
    line-height: 40px;
    display: flex;
    align-items: Center;
  }

  .btn_ok {
    color: white;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: rgb(255, 0, 76);
    text-align: center;
    position: absolute;
    bottom: 0px;
    font-size: 16px;
  }

  .btn_size {
    font-size: 14px;
    color: rgb(194, 194, 194);
    padding: 5px 10px;
    border: 1px solid rgb(194, 194, 194);
    border-radius: 3px;
    display: inline-block;
    margin: 5px;
  }

  .btn_size_selected {
    border: 1px solid orangered;
    color: gray;
  }

  .info_count_title {
    display: inline-block;
    margin-right: 20px;
  }

  .info_count .option {
    display: inline-block;
    color: rgb(163, 163, 163);
    margin-left: 10px;
    border-radius: 5px;
    border: 1px solid rgb(199, 199, 199);
    overflow: hidden;
    /* background: rgb(230, 230, 230); */
    background: rgb(255, 255, 255);
    padding: 0px 5px;
    height: 24px;
    right: 20px;
  }

  .info_count .option .sub {
    width: 10px;
  }

  .info_count .option .add {
    width: 10px;
  }

  .info_count .option .num {
    background: white;
    padding: 0px 10px;
    border-left: 1px solid rgb(199, 199, 199);
    border-right: 1px solid rgb(199, 199, 199);
  }

  .info_count .option .small {
    float: left;
    margin: 0px 5px;
    line-height: 24px;
    height: 24px;
  }

  /* 头部 */
  .page_hd {
    font-size: 14px;
  }

  .title_swiper {
    height: 300px;
    background-color: gray;
  }

  .swiper_banner {
    height: 100%;
    width: 100%;
  }

  .slide-image {
    height: 100%;
    width: 100%;
  }

  /* 头部滑动图片 */
  .page_bd {
    padding: 10px;
  }

  /* 标题 */
  .page_bd .share {
    width: 30px;
    height: 40px;
    text-align: center;
    font-size: 10px;
    float: right;
  }

  .shareButton {
    font-size: 25px;
    width: 30px;
    /*height: 40px;*/
    text-align: center;
    float: right;
  }

  button::after {
    border: none;
  }

  button {
    background-color: #fff;
    border: 0px;
    padding: 0px;
  }

  button span {
    font-size: 10px;
  }

  .page_bd .share image {
    width: 30px;
    height: 30px;
  }

  .RMB_flag {
    color: red;
  }

  .page_bd .goods_price_originalPrice {
    color: red;
    font-size: 22px;
    margin-right: 15px;
  }

  .page_bd .goods_price {
    text-decoration: line-through;
    color: gray;
  }

  /* ------------- 底部 */
  .foot_option {
    bottom: 0px;
    text-align: center;
    position: fixed;
    width: 100%;
    height: 50px;
    z-index: 99;
  }

  .foot_option .small {
    text-align: center;
    font-size: 10px;
    float: left;
    padding: 1%;
  }

  .foot_option .small image {
    display: block;
    height: 30px;
    width: 30px;
    margin: 0px auto;
  }

  .customer_service {
    line-height: 15px;
    text-align: center;
    background: rgba(214, 209, 211, 0.651);
    width: 10%;
  }

  .shopcar {
    text-align: center;
    line-height: 15px;
    background: rgba(197, 138, 155, 0.651);
    width: 10%;
  }

  .foot_option .join {
    width: 38%;
    font-size: 16px;
    color: rgb(255, 0, 76);
    background: rgba(253, 220, 229, 0.849);
    float: left;
    height: 100%;
    line-height: 50px;
  }

  .foot_option .buy {
    width: 38%;
    font-size: 16px;
    color: white;
    background: rgb(255, 0, 76);
    float: left;
    height: 100%;
    line-height: 50px;
  }
</style>
